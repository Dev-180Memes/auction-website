import React, { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import { decodeJwt } from "@/utils/decodeToken";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PopularProductCard from "@/components/PopularProductsCard";

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
    <>
      <Toaster />
      <main className="relative">
        <Navbar />
        <section className="padding">
          <div className="max-container max-sm:mt-12">
            <div className="flex flex-col justify-start gap-5">
              <h2 className="text-4xl font-palanquin font-bold">
                My <span className="text-coral-red">Items</span>
              </h2>
              <p className="lg:max-w-lg mt-2 font-montserrat text-slate-gray">
                Here are the items you have listed for auction.
              </p>
            </div>

            <div className="mt-16 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 sm:gap-6 gap-14">
              {myItems.map((product) => (
                <PopularProductCard key={product.title} {...product} />
              ))}
            </div>
          </div>
        </section>
        <section className="bg-black padding-x padding-t pb-8">
          <Footer />
        </section>
      </main>
    </>
  )
};

export default MyItems;
