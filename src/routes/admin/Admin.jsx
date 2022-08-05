import React, { useState } from 'react'
import c from "./Admin.module.css"
import { db, storage } from "../../firebase/firebase"

const Admin = () => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImg, setProductImg] = useState('');
  const [mainimg, setMain] = useState('')
  const [hoverImg, setHoverImg] = useState('')
  const [error, setError] = useState('');

  const types = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp']; // image types

  const upload = (e) => {
    let file = e.target.files[0];
    if (file && types.includes(file.type)) {
      setProductImg(file);
      setError('')
    }
    else {
      setProductImg(null);
      setError('Please select a valid image type (jpg, png, jpeg or webp)');
    }
  }

  // add product
  const createTheProduct = (e) => {
    e.preventDefault();
    const uploadTask = storage.ref(`product-images/${productImg.name}`).put(productImg);
    uploadTask.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(progress);
    }, err => setError(err.message)
      , () => {
        storage.ref('product-images').child(productImg.name).getDownloadURL().then(url => {
          db.collection('Products').add({
            ProductImg: url,
            ProductName: productName,
            ProductPrice: Number(productPrice),
            MainImg: mainimg,
            HoverImg: hoverImg
          }).then(() => {
            // setProductName('');
            setProductPrice(0)
            setProductImg('');
            setMain('')
            setHoverImg('')
            setError('');
            document.getElementById('file').value = '';
          }).catch(err => setError(err.message))
        })
      })
  }

  // console.log(productName, productImg, productPrice);

  return (
    <div className={c.admin}>
      <h1>Add Product</h1>
      <form onSubmit={createTheProduct}>
        <label className={c.pro_name}>Product Name
          <input type="text" placeholder="Product Name" value={productName} onChange={e => setProductName(e.target.value)} />
        </label>
        <label className={c.pro_cost}>Product Price
          <input type="number" placeholder="Product Price" value={productPrice} onChange={e => setProductPrice(e.target.value)} />
        </label>
        <label className={c.pro_cost}>Product Price
          <input type="text" placeholder="Main image" value={mainimg} onChange={e => setMain(e.target.value)} />
        </label>
        <label className={c.pro_cost}>Product Price
          <input type="text" placeholder="Hover image" value={hoverImg} onChange={e => setHoverImg(e.target.value)} />
        </label>
        <label className={c.pro_file}>
          Only choose image like png, jpeg or jpg
          <input type="file" onChange={upload} id="file" />
        </label>
        <button type="submit" className={c.upload_btn}>Create Product</button>
      </form>
      {
        error && <span>{ error }</span>
      }
    </div>
  )
}

export default Admin
