import React, { useState } from 'react'
import c from "./Admin.module.css"
import { db, storage } from "../../firebase/firebase"

const Admin = () => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImg, setProductImg] = useState('');
  const [mainimg, setMain] = useState('')
  const [hoverImg, setHoverImg] = useState('')
  const [color, setColor] = useState('')
  const [error, setError] = useState('');
  const [percent, setPercent] = useState(0)
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
      setPercent(progress)
    }, err => setError(err.message)
      , () => {
        storage.ref('product-images').child(productImg.name).getDownloadURL().then(url => {
          db.collection('Products').add({
            ProductImg: url,
            ProductName: productName,
            ProductPrice: Number(productPrice),
            MainImg: mainimg,
            HoverImg: hoverImg,
            Color: color
          }).then(() => {
            setProductName('');
            setProductPrice(0)
            setProductImg('')
            setColor('')
            setMain('')
            setHoverImg('')
            setError('')
            document.getElementById('file').value = '';
          }).catch(err => setError(err.message))
        })
      })
  }

  // console.log(productName, productImg, productPrice);

  return (
    <div className={c.admin}>
      <h1>Add Product</h1>
      <form onSubmit={createTheProduct} autoComplete="off">
        <label className={c.pro_name}>Product Name
          <input type="text" placeholder="Product Name"
          value={productName} 
          required
          onChange={e => setProductName(e.target.value)} />
        </label>
        <label className={c.pro_cost}>Product Price
          <input type="number" placeholder="Product Price" 
          required
          value={productPrice} 
          onChange={e => setProductPrice(e.target.value)} />
        </label>
        <label className={c.pro_cost}>Product Main image URL
          <input type="text" placeholder="Main image" 
          required
          value={mainimg} 
          onChange={e => setMain(e.target.value)} />
        </label>
        <label className={c.pro_cost}>Product Hover image URL
          <input type="text" placeholder="Hover image" 
          required
          value={hoverImg} 
          onChange={e => setHoverImg(e.target.value)} />
        </label>
        <label className={c.pro_cost}>Product Color
          <input type="text" placeholder="Color" 
          required
          value={color} 
          onChange={e => setColor(e.target.value)} />
        </label>
        <label className={c.pro_file}>
          Only choose image like png, jpeg or jpg
          <input type="file" onChange={upload} id="file" />
        </label>
        <button type="submit" className={c.upload_btn}>Create Product</button>
      </form>
      {
        percent >= 100 ? <></> : <h3>Uploading... {percent}</h3>
      }
      {
        error && <span>{ error }</span>
      }
    </div>
  )
}

export default Admin
