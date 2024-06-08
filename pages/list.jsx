import React, { useEffect, useState } from 'react'
import { toast, Toaster } from 'react-hot-toast';
import Button from '@/components/Button';
import { decodeJwt } from '@/utils/decodeToken';
import { useRouter } from 'next/router';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const List = () => {
  const [userId, setUserId] = useState("");
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decodedToken = decodeJwt(token)

      if (decodedToken && decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem("token");
        router.push("/")
      } else {
        setUserId(decodedToken.id)
      }
    } else {
      router.push("/")
    }

    
  }, [router]);

  const handleProductListing = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const description = e.target.description.value;
    const starting_price = e.target.starting_price.value;
    const start_time = e.target.start_time.value;
    const end_time = e.target.end_time.value;
    const image = e.target.image.files[0];

    let image_url = '';
    const seller_id = userId;

    const formData = new FormData();
    formData.append('image', image);

    fetch('https://api.imgbb.com/1/upload?key=8abdbad2335b4f5dcac281c6e08ac5b3', {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        image_url = data.data.url;

        const handleCreateProduct = async () => {
          const response = await fetch('/api/products/create', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ seller_id, title, description, starting_price, start_time, end_time, image_url })
          });
      
          const data = await response.json();
      
          if (data.success) {
            toast.success("Product listed successfully");
            // Set the form to empty
            e.target.title.value = '';
            e.target.description.value = '';
            e.target.starting_price.value = '';
            e.target.start_time.value = '';
            e.target.end_time.value = '';
            e.target.image.value = '';
          } else {
            toast.error(data.message);
          }
        }

        handleCreateProduct();
      })
      .catch(error => {
        console.error(error);
        toast.error("Couldn't upload image, Please try again");
        return;
      });

  }

  return (
    <>
      <Toaster />
      <main className="relative">
        <Navbar />
        <section className="padding flex flex-col items-center">
          <div className="max-container max-sm:mt-12">
            <div className="flex flex-col justify-start gap-5">
              <h2 className="text-4xl font-palanquin font-bold">
                List a <span className="text-coral-red">Product</span>
              </h2>
            </div>
          </div>
        </section>
        <section className="mb-4 flex flex-col items-center">
          <form onSubmit={handleProductListing} className="flex max-w-md flex-col gap-4 mb-4">
            <div>
              <div className="mb-2 block">
                <label htmlFor="title">Item Name</label>
              </div>
              <input type="text" id='title' placeholder='Item Name' className='rounded-xl' required />
            </div>
            <div>
              <div className="mb-2 block">
                <label htmlFor="description">Description</label>
              </div>
              <input type="text" id='description' placeholder='Description' className='rounded-xl' required />
            </div>
            <div>
              <div className="mb-2 block">
                <label htmlFor="starting_price">Starting Price</label>
              </div>
              <input type="number" placeholder='Starting Price' id="starting_price" className="rounded-xl" required />
            </div>
            <div>
              <div className="mb-2 block">
                <label htmlFor="start_time">Start Date</label>
              </div>
              <input type="date" id="start_time" required />
            </div>
            <div>
              <div className="mb-2 block">
                <label htmlFor="end_time">End Date</label>
              </div>
              <input type="date" id='end_time' required />
            </div>
            <div>
              <div className="mb-2 block">
                <label htmlFor="image">Item Image</label>
              </div>
              <input type="file" name='image' id="image" />
            </div>
            <Button 
              label="Submit"
              type="submit"
            />
          </form>
        </section>
        <section className="bg-black padding-x padding-t pb-8">
          <Footer />
        </section>
      </main>
    </>
    // <div className='h-screen flex items-center justify-center'>
    //   <Toaster />
    //   <form className='flex max-w-md flex-col gap-4' onSubmit={handleProductListing}>
    //     <h2 className='text-xl font-bold'>List a Product</h2>
    //     <div>
    //       <div className='mb-2 block'>
    //         <Label htmlFor='title' value='Product Name' />
    //       </div>
    //       <TextInput id='title' type='text' placeholder='Product Name' required />
    //     </div>
    //     <div>
    //       <div className='mb-2 block'>
    //         <Label htmlFor='description' value='Description' />
    //       </div>
    //       <TextInput id='description' type='text' placeholder='Description' required />
    //     </div>
    //     <div>
    //       <div className='mb-2 block'>
    //         <Label htmlFor='starting_price' value='Starting Price' />
    //       </div>
    //       <TextInput id='starting_price' type='number' placeholder='Starting Price' required />
    //     </div>
    //     <div>
    //       <div className="mb-2 block">
    //         <Label htmlFor='start_time' value='Start Date'/>
    //       </div>
    //       <TextInput id='start_time' type='date' required />
    //     </div>
    //     <div>
    //       <div className="mb-2 block">
    //         <Label htmlFor='end_time' value='End Date'/>
    //       </div>
    //       <TextInput id='end_time' type='date' required />
    //     </div>
    //     <div>
    //       <div className="mb-2 block">
    //         <Label htmlFor='image' value='Product Image' />
    //       </div>
    //       <input type="file" name="image" id="image" />
    //     </div>
    //     <Button type="submit">Submit</Button>
    //   </form>
    // </div>
  )
}

export default List;