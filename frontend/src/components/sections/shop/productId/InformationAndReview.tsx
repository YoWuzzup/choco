"use client";
import Link from "next/link";
import { useState } from "react";

import { useAppSelector } from "@/hooks/redux";
import { Button, Input } from "@/components";

const reviews: any[] = [
  { name: "asd", comment: "asd sd as dsadwda ", score: 4 },
  { name: "asd", comment: "asd sd as dsadwda ", score: 4 },
  { name: "asd", comment: "asd sd as dsadwda ", score: 4 },
];
// TODO: write the correct href pathsfor these links
const links = [
  {
    name: "Orders & Shipping",
    href: "#",
  },
  {
    name: "Returns & Refunds",
    href: "#",
  },
  {
    name: "Payments",
    href: "#",
  },
  {
    name: "Your Orders",
    href: "#",
  },
];

const AddInformation: React.FC = () => {
  return (
    <div
      className="py-8 px-3 mb-8 md:px-10 flex flex-col sm:flex-row justify-between gap-8
                border-b-[1px] border-[#e7e7e7] border-solid"
    >
      <div className="flex flex-row flex-wrap justify-center items-center">
        <p className="basis-full text-[11px] uppercase text-gray mb-1">
          MORE INFOMATION TO YOU
        </p>
        <h3
          className="basis-full text-primary text-2xl font-medium pb-4 mb-9 relative capitalize
                    after:content-[''] after:absolute  after:bottom-0 after:left-0
                    after:w-[40px] after:h-[2px] after:bg-colorful"
        >
          Things You Need To Know
        </h3>

        <div className="grid grid-rows-2 grid-cols-2 text-[#979797] gap-12">
          <div style={{ gridArea: "1 / 1 / 3 / 2" }}>
            <p className="mb-8">
              We use industry standard SSL encryption to protect your details.
              Potentially sensitive information such as your name, address and
              card details are encoded so they can only be read on the secure
              server.
            </p>

            <div className="flex flex-col justify-start">
              {[
                "Safe Payments",
                "Accept Credit Cart",
                "Different Payment Method",
                "Price Include VAT",
                "Easy To Order",
              ].map((it, i) => (
                <span key={`${it}_${i}`} className="mb-2">
                  {it}
                </span>
              ))}
            </div>
          </div>

          <div
            style={{ gridArea: "1 / 2 / 2 / 3" }}
            className="flex flex-col justify-start"
          >
            <h4 className="text-primary text-lg mb-2 basis-full">
              Need More Information
            </h4>

            {links.map((l, i) => (
              <Link
                href={l.href}
                key={`${l.name}_${i}`}
                className="relative transition-all ease-in-out delay-150 pb-1 
                            hover:text-colorful w-fit"
              >
                {l.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div>
        <img
          className="object-cover h-full w-full"
          src="/home/slide1.1.webp"
          alt="first slide"
        />
      </div>
    </div>
  );
};

const Reviews: React.FC = () => {
  const user = useAppSelector((st) => st.user);
  const [openNewReviewForm, setOpenNewReviewForm] = useState<boolean>(false);

  return (
    <div
      className="py-8 px-3 mb-8 md:px-10 flex flex-row flex-wrap justify-between gap-4
                  border-b-[1px] border-[#e7e7e7] border-solid"
    >
      <h4 className="basis-full text-sm">Customer Reviews</h4>

      <div className="basis-full">
        {reviews.length > 0 ? (
          reviews.map((r, i) => (
            <div
              key={`${r.name}_${i}`}
              className="flex flex-row flex-nowrap justify-between items-center 
                    border-b-[1px] border-[#e7e7e7] border-solid pb-4 mb-4"
            >
              <div className="flex flex-col grow">
                <div className="capitalize">{r.name}</div>
                <div className="text-paraPrimary">{r.comment}</div>
              </div>
              <div>{r.score}</div>
            </div>
          ))
        ) : (
          <div>No reviews yet</div>
        )}
        <div className="flex flex-col justify-start items-center text-paraPrimary">
          {user ? (
            <>
              <div
                className="text-primary hover:text-colorful cursor-pointer duration-300"
                onClick={() => setOpenNewReviewForm(!openNewReviewForm)}
              >
                Write a review
              </div>
              <div
                className={`flex flex-col w-full overflow-hidden transition-all duration-700 ${
                  openNewReviewForm ? "max-h-[250px]" : "max-h-0 invisible"
                }`}
              >
                <div className="text-[13px]">Rating</div>
                <div className="text-[13px]">
                  Raview Title
                  <Input
                    input={{
                      id: "title",
                      className: `border-solid border-[1px] border-grey w-full p-2 mt-2 mb-6`,
                    }}
                  />
                </div>
                <div className="text-[13px] w-full">
                  Review (1500)
                  <Input
                    input={{
                      id: "comment",
                      className: `border-solid border-[1px] border-grey w-full p-2 mt-2 mb-6`,
                    }}
                  />
                </div>
                <Button
                  type={"submit"}
                  buttonClasses={`text-secondary grow text-sm capitalize px-10 
                    bg-colorful hover:bg-secondary duration-300 h-14`}
                  handleClick={(e: any) => {}}
                >
                  submit review
                </Button>
              </div>
            </>
          ) : (
            "Log in to write a review"
          )}
        </div>
      </div>
    </div>
  );
};

export const InformationAndReview: React.FC = () => {
  const [tab, setTab] = useState<0 | 1>(0);

  return (
    <section className="w-full text-primary bg-primary flex flex-col mx-auto content-center">
      {/* tabs */}
      <div
        className="flex flex-row flex-nowrap justify-between sm:justify-start gap-0 sm:gap-6 items-center font-bold text-lg 
                py-6 px-3 md:px-10 border-b-[1px] border-[#e7e7e7] border-solid"
      >
        <div
          onClick={(e) => setTab(0)}
          className={`relative cursor-pointer
                after:content-[''] after:absolute after:w-full after:bg-colorful 
                after:h-[2px] after:bottom-0 after:left-0 after:scale-0 hover:after:scale-100
                after:duration-300 ${tab === 0 ? "after:scale-100" : ""}`}
        >
          Additional Information
        </div>
        <div
          onClick={(e) => setTab(1)}
          className={`relative cursor-pointer
                after:content-[''] after:absolute after:w-full after:bg-colorful 
                after:h-[2px] after:bottom-0 after:left-0 after:scale-0 hover:after:scale-100
                after:duration-300 ${tab === 1 ? "after:scale-100" : ""}`}
        >
          Review
        </div>
      </div>
      {tab ? <Reviews /> : <AddInformation />}
    </section>
  );
};
