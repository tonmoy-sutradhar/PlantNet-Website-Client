import { Helmet } from "react-helmet-async";
import AddPlantForm from "../../../components/Form/AddPlantForm";
import { imageUpload } from "../../../API/Utils";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const AddPlant = () => {
  const axiosSecure = useAxiosSecure();
  const [uploadButtonText, setUploadButtonText] = useState({
    name: "Upload Image.",
  });

  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const name = form.name.value;
    const category = form.category.value;
    const price = parseFloat(form.price.value);
    const quantity = parseInt(form.quantity.value);
    const description = form.description.value;
    const image = form.image.files[0];
    const imageUrl = await imageUpload(image);

    // seller info
    const seller = {
      name: user?.displayName,
      image: user?.photoURL,
      email: user?.email,
    };

    // Create plant data obj
    const plantData = {
      name,
      category,
      description,
      price,
      quantity,
      image: imageUrl,
      seller,
    };

    console.table(plantData);
    // Save plant in Database ----->>>
    try {
      // post req
      await axiosSecure.post("/plants", plantData);
      toast.success("Successfully Data Added.");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <Helmet>
        <title>Add Plant | Dashboard</title>
      </Helmet>

      {/* Form */}
      <AddPlantForm
        handleSubmit={handleSubmit}
        uploadButtonText={uploadButtonText}
        setUploadButtonText={setUploadButtonText}
        loading={loading}
      />
    </div>
  );
};

export default AddPlant;
