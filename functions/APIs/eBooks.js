const { db } = require('../util/admin');

exports.getAllEBooks = (request, response) => {
  const query = request.query.query;

	db
		.collection('eBooks')
		.orderBy('title')
    .startAt(query)
    .endAt(query+'\uf8ff')
		.get()
		.then((data) => {
			let eBooks = [];
			data.forEach((doc) => {
				eBooks.push({
          id: doc.id,
          title: doc.data().title + query,
					slug: doc.data().slug,
					shortDescription: doc.data().shortDescription,
          thumbnail: doc.data().thumbnail,
				});
			});
			return response.json(eBooks);
		})
		.catch((err) => {
			console.error(err);
			return response.status(500).json({ error: err.code});
		});
};

exports.postOneEBook = (request, response) => {
	if (request.body.shortDescription.trim() === '') {
		return response.status(400).json({ shortDescription: 'Must not be empty' });
  }
  
  if(request.body.title.trim() === '') {
      return response.status(400).json({ title: 'Must not be empty' });
  }
  
  const newEBookItem = {
      title: request.body.title,
      slug: request.body.slug,
      shortDescription: request.body.shortDescription,
      thumbnail: request.body.thumbnail,
      createdAt: new Date().toISOString()
  }
  db
      .collection('eBooks')
      .add(newEBookItem)
      .then((doc)=>{
          const responseEBookItem = newEBookItem;
          responseEBookItem.id = doc.id;
          return response.json(responseEBookItem);
      })
      .catch((err) => {
    response.status(500).json({ error: 'Something went wrong' });
    console.error(err);
  });
};
