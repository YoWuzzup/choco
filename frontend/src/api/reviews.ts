import axios from "axios";

const url = process.env.NEXT_PUBLIC_BACKEND_URL;

export const POSTCreateProductReviews = async (
  reviewData: any,
  access_token: string | null
) => {
  try {
    const res = await axios.post(
      `${url}review`,
      { reviewData, access_token },
      {
        withCredentials: true,
      }
    );

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const GETReviews = async (query: unknown) => {
  try {
    const res = await axios.get(`${url}review`, {
      params: query,
      withCredentials: true,
    });
    const { data } = res;

    return data;
  } catch (error) {
    throw error;
  }
};

export const DELETEReview = async (id: string, access_token: string) => {
  try {
    const res = await axios.delete(`${url}review/${id}`, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};
