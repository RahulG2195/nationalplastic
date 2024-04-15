"use client";
import "./Registration.css";
import { useState } from "react";
import axios from "axios";
import { Bounce, toast } from "react-toastify";
import {
  isValidName,
  isValidMobile,
  // isValidFile,
} from "@/utils/validation";
const notify = () => {
  toast.success("Mail Sended SucessFully", {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
  });
};
const notifyError = () => {
  toast.error("Failed To send Mail", {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
  });
};
const Registration = () => {
  const [userInput, setUserInput] = useState({
    JobProfile: "",
    email: "",
    FullName: "",
    resume: null,
    MobileNumber: "",
  });
  const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  //   function handleInputChange(e) {
  //     const { name, value, files } = e.target;
  //     const file = files ? files[0] : " ";
  // //console.log(file);
  //     setUserInput({
  //       ...userInput,
  //       [name]: file || value,
  //     });
  //   }
  async function handleInputChange(event) {
    const { name, value } = event.target;
    {
      setUserInput({ ...userInput, [name]: value });
    }
  }
  async function handleImageUpload(e) {
    e.preventDefault();
    const uploadedImage = e.target.files[0];
    if (uploadedImage) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListener("load", function () {
        setUserInput({
          ...userInput,
          file: uploadedImage,
        });
      });
    }
  }
  async function onFormSubmit(e) {
    // toast
    e.preventDefault();
    //console.log("UserInput");
    //console.log(JSON.stringify(userInput));
    if (!isValidName(userInput.JobProfile)) {
      toast.error("Please enter a valid name.");
      return;
    }

    if (!isValidMobile(userInput.MobileNumber)) {
      toast.error("Please enter a valid mobile number.");
      return;
    }
    const formData = new FormData();
    for (let key in userInput) {
      formData.append(key, userInput[key]);
    }
    try {
      const res = await axios.post(
        `http://localhost:3000/api/sendResume`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // toast("Your Message has been submitted successfully.");
      if (res.status === 200) {
        resetButton();
        notify();
      } else {
        notifyError();
      }
    } catch (err) {
      //console.log(err.message);
      toast.error("Something went Wrong. please try again later.");
    }
  }
  async function resetButton() {
    setUserInput({
      JobProfile: "",
      email: "",
      FullName: "",
      resume: null,
      MobileNumber: "",
      file: null,
    });
  }

  return (
    <>
      <div className=" d-flex justify-content-center">
        <div className="formBody mt-5">
          <div className="RegformCont p-5">
            <form onSubmit={onFormSubmit} onReset={resetButton}>
              <div className="row">
                <div className="mb-3 col-md-4">
                  <label className="form-label fw-bold">Job Profile*</label>
                  <input
                    type="text"
                    className="form-control "
                    id="JobProfile"
                    name="JobProfile"
                    onChange={handleInputChange}
                    value={userInput.JobProfile}
                    required
                  />
                </div>
                <div className="mb-3 col-md-4">
                  <label className="form-label fw-bold">Full Name*</label>
                  <input
                    type="text"
                    className="form-control "
                    id="FullName"
                    name="FullName"
                    onChange={handleInputChange}
                    value={userInput.FullName}
                    required
                  />
                </div>
                <div className="mb-3 col-md-4">
                  <label className="form-label fw-bold">
                    Attach CV/Resume/Bio-data*
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="file"
                    placeholder="Maximum Size: 50mb"
                    name="file"
                    onChange={handleImageUpload}
                    value={userInput.resume}
                  />
                </div>

                <div className="mb-3 col-md-4">
                  <label className="form-label fw-bold">Email Address*</label>
                  <input
                    type="Email"
                    className="form-control "
                    id="email"
                    name="email"
                    onChange={handleInputChange}
                    value={userInput.email}
                    required
                  />
                </div>
                <div className="mb-3 col-md-4">
                  <label className="form-label fw-bold">Mobile Number*</label>
                  <input
                    type="Number"
                    className="form-control "
                    id="MobileNumber"
                    name="MobileNumber"
                    onChange={handleInputChange}
                    value={userInput.MobileNumber}
                    required
                  />
                </div>
                <div className="mb-3 col-md-4 d-flex align-items-end justify-content-center gap-5">
                  <div class="mb- col-md-4 d-flex align-items-end justify-content-center registrationBtnResp gap-4">
                    <button className="btn btn-danger px-4" type="submit">
                      Submit
                    </button>
                    <button className="btn btn-danger px-4" type="reset">
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default Registration;
