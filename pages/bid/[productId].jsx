import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { toast, Toaster } from 'react-hot-toast';
import Image from 'next/image';
import { decodeJwt } from '@/utils/decodeToken';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Button from '@/components/Button';

const Bids = () => {
  const [bids, setBids] = useState([]);
  const [productData, setProductData] = useState({});
  const [userId, setUserId] = useState("");
  const router = useRouter();
  const { productId } = router.query;

  useEffect(() => {
    if (!productId) return;

    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    const decodeToken = decodeJwt(token)
    setUserId(decodeToken.id)

    const fetchProductInfo = async () => {
      const response = await fetch(`/api/products/${productId}`);
      const data = await response.json();
      setProductData(data.data);
    }

    const fetchBids = async () => {
      const response = await fetch(`/api/products/bid/${productId}`);
      const data = await response.json();
      setBids(data.data);
    };

    fetchProductInfo();
    fetchBids();
  }, [productId, router]);

  // console.log(productData)

  const handleBidSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const decodedToken = decodeJwt(token);
    const userId = decodedToken.id;

    const bidAmount = e.target.bid_amount.value;

    if (userId === productData.seller_id) {
      toast.error("You can't bid on your own item")
      return
    }

    const response = await fetch(`/api/bids/bid`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        bidder_id: userId,
        product_id: productId,
        bid_amount: bidAmount,
        bid_time: new Date(),
      }),
    });

    const data = await response.json();

    if (data.success) {
      e.target.reset();
      // Add data to bids array
      setBids([...bids, data.data])
      toast.success('Bid placed successfully');
    } else {
      toast.error(data.message);
    }
  }

  const handleEndAuction = async () => {
    const response = await fetch(`/api/bids/end/${productId}`, {
      method: "GET",
    });

    const data = await response.json();

    if (data.success) {
      toast.success(data.message);
      router.push('/');
    } else {
      toast.error(data.message);
    }
  }

  const handleProductDelete = async() => {
    const response = await fetch(`/api/bids/delete/${productId}`, {
      method: "DELETE",
    });

    const data = await response.json();

    if (data.success) {
      toast.success(data.message);
      router.push('/');
    } else {
      toast.error(data.message);
    }
  }

  return (
    <>
      <Toaster />
      <main className="relative w-[100%]">
        <Navbar />
        <section className="padding">
          <div className="max-container max-sm:mt-12">
            <div className="flex flex-col justify-start gap-3">
              <Image
                src={productData.image_url}
                width={500}
                height={500}
                alt="Product Image"
                className='rounded-xl object-cover'
              />
              <h2 className="text-4xl font-palanquin font-bold">
                {productData.title}
              </h2>
              <p className="lg:max-w-lg mt-2 font-montserrat text-slate-gray">
                {productData.description}
              </p>
              <p className="lg:max-w-lg mt-2 font-montserrat text-slate-gray">
                Starting Price: ${productData.starting_price}
              </p>
              <p className="lg:max-w-lg mt-2 font-montserrat text-coral-red">
                Current Price: ${productData.current_price}
              </p>
              <p className="lg:max-w-lg mt-2 font-montserrat text-slate-gray">
                Bid Ends: {productData.end_time?.toString().split('T')[0]}
              </p>
            </div>
          </div>
        </section>
        <section className="padding-x flex gap-10 mb-10">
          <form onSubmit={handleBidSubmit} className="flex max-w-md flex-col gap-4 mb-4">
            <div>
              <div className="mb-2 block">
                <label htmlFor="bid_amount">Bid Amount</label>
              </div>
              <input type="number" id='bid_amount' placeholder='Bid Amount' className='rounded-xl' required />
            </div>
            {productData.status === 'active' ? (
              <Button type='submit' label="Place Bid" />
            ) : (
              <p className='text-red-500 font-semibold'>Auction has ended</p>
            )}
          </form>
          <div>
            <table className="table-auto">
              <thead>
                <tr>
                  <th className="px-4 py-2">Bid Amount</th>
                  <th className="px-4 py-2">Bidder</th>
                  <th className="px-4 py-2">Bid Date</th>
                </tr>
              </thead>
              <tbody>
                {bids.map((bid) => (
                  <tr key={bid._id}>
                    <td className="border px-4 py-2">{bid.bid_amount}</td>
                    <td className="border px-4 py-2">{bid.bidder_id.userName}</td>
                    <td className="border px-4 py-2">{bid.bid_time.toString().split('T')[0]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {userId === productData.seller_id ? (
              productData.status === 'inactive' ? (
                <Button className='mt-5' onClick={handleEndAuction} label="End Auction" />
              ) : (
                <Button className='mt-5' disabled label="Auction is still ongoing" />
              )
            ) : (
              null
            )}

            {userId === productData.seller_id ? (
              <Button className='mt-5' onClick={handleProductDelete} label="Delete Product" />
            ) : (
              null
            )}
          </div>
        </section>
        <section className="bg-black padding-x padding-t pb-8">
          <Footer />
        </section>
      </main>
    </>
  )
}

export default Bids;