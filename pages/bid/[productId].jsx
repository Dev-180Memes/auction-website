import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { 
  TextInput, 
  Label, 
  Button,
  Table
} from 'flowbite-react';
import { toast, Toaster } from 'react-hot-toast';
import Image from 'next/image';
import { decodeJwt } from '@/utils/decodeToken';

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

  return (
    <div className="min-h-screen flex mx-5 my-5">
      <Toaster />
      <div className="w-1/2">
        <h1 className="text-3xl font-bold mb-2">{productData.title}</h1>
        <p className="mb-2 text-lg">{productData.description}</p>
        <p className="mb-2">Starting Price: {productData.starting_price}</p>
        <p className="mb-2">Start Date: {productData.start_time?.toString().split('T')[0]}</p>
        <p className="mb-2">End Date: {productData.end_time?.toString().split('T')[0]}</p>
        <Image className='mb-2 rounded' src={productData.image_url} width={300} height={300} alt='Product Image' />
        <form className='flex flex-col gap-3' onSubmit={handleBidSubmit}>
          <Label>
            <span>Bid Amount</span>
            <TextInput name="bid_amount" id='bid_amount' type="number" />
          </Label>
          {productData.status === 'active' ? (
            <Button type='submit'>Place Bid</Button>
          ) : (
            <p className='text-red-500'>Auction has ended</p>
          )}
        </form>
      </div>
      {/* Bid History */}
      <div className="w-1/2">
        <Table>
          <thead>
            <tr>
              <th>Bid Amount</th>
              <th>Bidder</th>
              <th>Bid Date</th>
            </tr>
          </thead>
          <tbody>
            {bids.map((bid) => (
              <tr key={bid._id}>
                <td>{bid.bid_amount}</td>
                <td>{bid.bidder_id.userName}</td>
                <td>{bid.bid_time.toString().split('T')[0]}</td>
              </tr>
            ))}
          </tbody>
          {/* If user id is the same as seller id and bid status is inactive show End Bid Button */}
        </Table>
        {userId === productData.seller_id ? (
          productData.status === 'inactive' ? (
            <Button className='mt-5' onClick={handleEndAuction}>End Auction</Button>
          ) : (
            <Button className='mt-5' disabled>Auction is still ongoing</Button>
          )
        ) : (
          null
        )}
      </div>
    </div>
  )
}

export default Bids;