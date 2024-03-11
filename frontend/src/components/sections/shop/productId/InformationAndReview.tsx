"use client";
import Link from "next/link";
import { useState } from "react";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { AuthOverlay, Button, Input, Tooltip } from "@/components";
import { POSTUpdateUser } from "@/api/user";
import { addSingleProduct } from "@/redux/slices/productsSlice";
import { useReduxAndLocalStorage } from "@/hooks/useReduxAndLocalStorage ";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import { DELETEReview, POSTCreateProductReviews } from "@/api/reviews";
import { userUpdate } from "@/redux/slices/userSlice";
import { addReviews } from "@/redux/slices/reviewsSlice";

const links = [
  {
    name: "Aboout Us",
    href: "/about",
  },
  {
    name: "Your Cart",
    href: "/profile/cart",
  },
  {
    name: "Your Orders",
    href: "/profile",
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
        {/* TODO: add image */}
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
  const dispatch = useAppDispatch();
  const product = useAppSelector((st) => st.products.singleProduct);
  const reviews = useAppSelector((st) => st.reviews);
  const user = useAppSelector((st) => st.user);
  const [access_token, saveAccessTokenToReduxAndLocalStorage] =
    useReduxAndLocalStorage("access_token");
  const [openNewReviewForm, setOpenNewReviewForm] = useState<boolean>(false);
  const [showAuthOverlay, setShowAuthOverlay] = useState<boolean>(false);
  const [review, setReview] = useState({
    title: "",
    comment: "",
    rating: 5,
    author: user?.name || user?.email || "unknown",
  });

  const handleChangeReview = (e: React.ChangeEvent<unknown>) => {
    e.preventDefault();

    let target = e.target as HTMLInputElement;

    setReview((prev) => {
      return { ...prev, [target.name]: target.value };
    });
  };

  const handleUserExists = (e: any) => {
    e.preventDefault();

    user ? setOpenNewReviewForm(!openNewReviewForm) : setShowAuthOverlay(true);
  };

  const handleSubmitReview = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (product?._id && user?._id) {
      // update product with a new review
      const data = await POSTCreateProductReviews(
        { ...review, userId: user?._id, productId: product._id },
        access_token as string
      );

      dispatch(addSingleProduct(data));
    }

    // reset inputs
    setReview({
      title: "",
      comment: "",
      rating: 5,
      author: user?.name || user?.email || "unknown",
    });
  };

  const handleDeleteReview = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    reviewId: string
  ) => {
    e.preventDefault();

    if (product?._id && user?._id) {
      // update product with a new review
      const data = await DELETEReview(reviewId, access_token as string);
      // updating the state
      dispatch(userUpdate({ reviews: data.userReviews }));
      dispatch(addSingleProduct({ reviews: data.productReviews }));
    }
  };

  return (
    <div
      className="py-8 px-3 mb-8 md:px-10 flex flex-row flex-wrap justify-between gap-4
                  border-b-[1px] border-[#e7e7e7] border-solid"
    >
      <h4 className="basis-full text-sm">Customer Reviews</h4>

      <div className="basis-full">
        {reviews && reviews?.length > 0 ? (
          reviews?.map((r, i) => (
            <div
              key={`${r.author}_${i}`}
              className="flex flex-row flex-nowrap justify-between items-center 
                    border-b-[1px] border-[#e7e7e7] border-solid pb-4 mb-4"
            >
              <div className="flex flex-col grow">
                <div>{r.author}</div>
                <div className="text-paraPrimary flex flex-col">
                  {r.comment}

                  {/* delete review button */}
                  {user?.reviews.includes(r._id) ||
                  r.author === (user?.email || user?.name) ? (
                    <Button
                      handleClick={(e) => handleDeleteReview(e, r._id)}
                      type={"button"}
                      buttonClasses={"self-center mt-4"}
                    >
                      <Tooltip
                        message="delete your review"
                        containerStyles="group/tooltip w-5 self-center relative 
                        flex justify-center items-center cursor-pointer text-red"
                      >
                        <HighlightOffOutlinedIcon className="w-10" />
                      </Tooltip>
                    </Button>
                  ) : null}
                </div>
              </div>
              <div className="flex justify-center items-center text-2xl w-auto gap-2">
                {r.rating}
                <svg
                  className={`w-8 h-8 ms-1 text-yellow`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
              </div>
            </div>
          ))
        ) : (
          <div>No reviews yet</div>
        )}
        <div className="flex flex-col justify-start items-center text-paraPrimary">
          <div
            className="text-primary hover:text-colorful cursor-pointer duration-300"
            onClick={handleUserExists}
          >
            Write a review
          </div>
          <div
            className={`flex flex-col w-full overflow-hidden transition-all duration-700 ${
              openNewReviewForm ? "max-h-[250px]" : "max-h-0 invisible"
            }`}
          >
            <div className="text-[13px] flex flex-row justify-start items-center mb-3">
              {[1, 2, 3, 4, 5].map((i, index) => (
                <Input
                  key={`${index}`}
                  input={{
                    id: `rating-${index}`,
                    name: "rating",
                    type: "radio",
                    className: "hidden",
                    value: i,
                    onChange: handleChangeReview,
                  }}
                  label={{
                    htmlFor: `rating-${index}`,
                    className: "",
                    children: (
                      <svg
                        className={`w-4 h-4 ms-1 ${
                          review.rating > index ? "text-yellow" : "text-gray"
                        }`}
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                    ),
                  }}
                ></Input>
              ))}
            </div>
            <div className="text-[13px]">
              Review Title
              <Input
                input={{
                  id: "title",
                  name: "title",
                  value: review.title,
                  onChange: handleChangeReview,
                  className: `border-solid border-[1px] border-grey w-full p-2 mt-2 mb-6`,
                }}
              />
            </div>
            <div className="text-[13px] w-full">
              Review {1500 - review.comment.length}
              <Input
                input={{
                  id: "comment",
                  name: "comment",
                  value: review.comment,
                  onChange: handleChangeReview,
                  className: `border-solid border-[1px] border-grey w-full p-2 mt-2 mb-6`,
                }}
              />
            </div>

            <Button
              type={"submit"}
              buttonClasses={`text-secondary grow text-sm capitalize px-10 
                    bg-colorful hover:bg-secondary duration-300 h-14`}
              handleClick={handleSubmitReview}
            >
              submit review
            </Button>
          </div>
        </div>
      </div>

      {showAuthOverlay && (
        <AuthOverlay setShowAuthOverlay={setShowAuthOverlay} />
      )}
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
