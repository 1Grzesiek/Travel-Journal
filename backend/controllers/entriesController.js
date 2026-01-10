import Entry from "../models/Entry.js";

export async function getEntries(req, res) {
  const userId = req.user.id;
  const entries = await Entry.find({ userId }).sort({ createdAt: -1 });
  res.json(entries);
}

// create
export async function createEntry(req, res) {
  const userId = req.user.id;
  const { title, desc, date, location } = req.body;

  let mainImage = null;
  if (req.files?.image?.[0]) {
    mainImage = {
      data: req.files.image[0].buffer,
      contentType: req.files.image[0].mimetype
    };
  }

  const gallery = [];
  if (req.files?.gallery) {
    for (let file of req.files.gallery) {
      gallery.push({
        data: file.buffer,
        contentType: file.mimetype
      });
    }
  }

  const entry = new Entry({
    userId,
    title,
    desc,
    date,
    image: mainImage,
    gallery,
    location
  });

  await entry.save();
  res.json({ success: true, entry });
}

// update
export async function updateEntry(req, res) {
  const userId = req.user.id;
  const id = req.params.id;

  const entry = await Entry.findOne({ _id: id, userId });
  if (!entry) return res.status(404).json({ message: "Not found" });

  const { title, desc, location, removeMainImage, removeGalleryIndexes } = req.body;

  entry.title = title ?? entry.title;
  entry.desc = desc ?? entry.desc;
  entry.location = location ?? entry.location;
  entry.updatedAt = Date.now();

  // usuniecie miniaturki 
  if (removeMainImage === "true") {
    entry.image = null;
  }

  // zamiana miniaturki 
  if (req.files?.image?.[0]) {
    entry.image = {
      data: req.files.image[0].buffer,
      contentType: req.files.image[0].mimetype,
    };
  }

  // usuwanie zdjec
  if (removeGalleryIndexes) {
    const indexes = JSON.parse(removeGalleryIndexes); 

    indexes.sort((a, b) => b - a).forEach(i => {
      if (entry.gallery[i]) entry.gallery.splice(i, 1);
    });
  }

  // dodawanie zdjec
  if (req.files?.gallery) {
    for (let f of req.files.gallery) {
      entry.gallery.push({
        data: f.buffer,
        contentType: f.mimetype,
      });
    }
  }

  await entry.save();
  res.json({ success: true, entry });
}

// delete
export async function deleteEntry(req, res) {
  const userId = req.user.id;
  const id = req.params.id;

  await Entry.findOneAndDelete({ _id: id, userId });
  res.json({ success: true });
}
