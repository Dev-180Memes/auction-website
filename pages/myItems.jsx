import React, { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import { decodeJwt } from "@/utils/decodeToken";
import { Card, Button } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";

const MyItems = () => {
  const [userId, setUserId] = useState("");
  const [myItems, setMyItems] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decodedToken = decodeJwt(token);

      if (decodedToken && decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem("token");
        router.push("/login");
      } else {
        setUserId(decodedToken.id);

        const fetchMyItems = async () => {
          const response = await fetch(`/api/users/${decodedToken.id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
    
          const data = await response.json();
    
          if (data.success) {
            setMyItems(data.data);
          } else {
            toast.error(data.message);
          }
        };
    
        fetchMyItems();
      }
    } else {
      router.push("/login");
    }
  }, [router]);

  console.log(myItems);

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <Toaster />
      <div className="flex flex-wrap gap-4 mt-5">
        {myItems &&
          myItems.map((product) => {
            const date = new Date(product.start_time);
            const endDate = new Date(product.end_time);

            // Format the date and time
            const options = {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            };
            const formattedDateTime = date.toLocaleString("en-US", options);
            const formattedEndDate = endDate.toLocaleString("en-US", options);

            return (
              <Card key={product._id} className="max-w-sm gap-3">
                <div className="flex flex-col items-center pb-10">
                  <Image
                    alt={product.title}
                    height="96"
                    src={product.image_url}
                    width="96"
                    className="mb-3 rounded-full shadow-lg"
                  />
                  <h2 className="text-lg font-semibold">{product.title}</h2>
                  <p className="text-md text-gray-500 mt-2">{product.description}</p>
                  <p className="text-md text-gray-500">Starting Price: {product.starting_price}</p>
                  <p className="text-md text-gray-500">Current Price: {product.current_price}</p>
                  <p className="text-md text-gray-500">Start Time: {formattedDateTime}</p>
                  <p className="text-md text-gray-500">End Time: {formattedEndDate}</p>
                  <Link href={`/bid/${product._id}`}>
                    <Button className="mt-5">View Bids</Button>
                  </Link>
                </div>
              </Card>
            );
          })}
      </div>
      {/* Sell a new products */}
      <div className="flex flex-col items-center pb-10 mt-10">
        <h2 className="text-lg font-semibold">Sell a new product</h2>
        <p className="text-md text-gray-500 mt-2 mb-2">Click the button below to sell a new product</p>
        <Button as={Link} href='/list'>Sell Product</Button>
      </div>
    </div>
  )
};

export default MyItems;
