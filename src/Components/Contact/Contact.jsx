import { useState, useEffect } from "react";

export default function Contact() {
  const [data, setData] = useState(null);
  const [successMessage, setSuccessMessage] = useState(false);

  useEffect(() => {
    fetch("/data/contact.json")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (!data) return;
    const formEl = document.getElementById("contact-form");
    if (!formEl) return;

    const textInputs = formEl.querySelectorAll(
      "input[type=text], input[type=email], textarea"
    );
    const fileInput = document.getElementById("file-input");
    const checkbox = document.getElementById("nda-checkbox");

    function showError(el, msg) {
      const errorSpan = el.parentElement.querySelector(".error-message");
      if (errorSpan) errorSpan.innerText = msg;
      el.classList.add("border-red-500");
    }

    function clearError(el) {
      const errorSpan = el.parentElement.querySelector(".error-message");
      if (errorSpan) errorSpan.innerText = "";
      el.classList.remove("border-red-500");
    }

    function showSuccessMessage() {
      setSuccessMessage(true);
      setTimeout(() => window.location.reload(), 1500);
    }

    const submitHandler = (e) => {
      e.preventDefault();
      let valid = true;

      textInputs.forEach((input) => {
        if (input.value.trim() === "") {
          showError(input, "This field is required");
          valid = false;
        } else {
          clearError(input);
        }
      });

      if (fileInput.files.length === 0) {
        alert("You must upload a file");
        valid = false;
      } else {
        clearError(fileInput);
      }

      if (!checkbox.checked) {
        alert("You must accept to protect your data");
        valid = false;
      } else {
        clearError(checkbox);
      }

      if (valid) showSuccessMessage();
    };

    formEl.addEventListener("submit", submitHandler);
    return () => formEl.removeEventListener("submit", submitHandler);
  }, [data]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <div className="w-full">
      {/* Top banner image */}
      <img
        src={data.mainImage.src}
        alt={data.mainImage.alt}
        className={data.mainImage.class}
      />

      {/* Contact section */}
      <div className="bg-white w-[90%] max-w-[1200px] mx-auto my-8 md:my-[50px] p-5 md:p-[50px] flex flex-col md:flex-row gap-8 md:gap-[60px]">
        <div className="md:flex-[1.2] text-left">
          {/* Title with highlighted part */}
          <h2 className="text-[26px] ">
            {data.contactSection.title.split(data.contactSection.highlight)[0]}
            <span className="text-[#9acd32]">
              {data.contactSection.highlight}
            </span>
            {data.contactSection.title.split(data.contactSection.highlight)[1]}
          </h2>

          {/* Description paragraph */}
          <p className="text-sm mb-5 leading-relaxed text-[#555]">
            {data.contactSection.description}
          </p>

          {/* Contact form */}
          <form id="contact-form" className="contact-form">
            {/* Render all input fields dynamically */}
            {data.contactSection.form.inputs.map((input, idx) => (
              <div className="mb-4" key={idx}>
                <input
                  type={input.type}
                  placeholder={input.placeholder}
                  className="w-full py-3 px-1 border-b border-[#8c8585] bg-transparent focus:outline-none"
                />
                <span className="error-message text-red-500 text-sm mt-1 block min-h-[1.25rem]"></span>
              </div>
            ))}

            {/* Textarea field */}
            <div className="mb-4">
              <textarea
                placeholder={data.contactSection.form.textarea.placeholder}
                className="w-full py-3 px-1 border-b border-[#8c8585] bg-transparent focus:outline-none resize-none h-[100px]"
              />
              <span className="error-message text-red-500 text-sm mt-1 block min-h-[1.25rem]"></span>
            </div>

            {/* File upload label with hidden input */}
            <label className="mt-4 p-4 border-2 border-dashed border-[#cfcfcf] text-[#6b6b6b] flex items-center gap-3 cursor-pointer">
              <input type="file" hidden id="file-input" />
              <span
                className="inline-flex w-7 h-7 items-center justify-center border border-[#cfcfcf] rounded-md text-[20px]"
                dangerouslySetInnerHTML={{
                  __html: data.contactSection.form.fileUpload.icon,
                }}
              ></span>
              <span>{data.contactSection.form.fileUpload.label}</span>
            </label>

            {/* NDA checkbox */}
            <div className="mt-3">
              <label className="text-sm flex items-center gap-2">
                <input
                  type="checkbox"
                  id="nda-checkbox"
                  className="accent-[#9acd32] cursor-pointer"
                />
                {data.contactSection.form.checkbox.label}
              </label>
            </div>

            {/* Submit button */}
            <button
              type={data.contactSection.form.submit.type}
              className="w-full md:w-[90%] h-[50px] bg-[#0e1b1b] text-white px-8 py-3 rounded font-bold mt-4 transition-colors duration-300 hover:bg-[#9acd32] hover:text-black cursor-pointer"
            >
              {data.contactSection.form.submit.label}
            </button>
          </form>

          {/* Success message popup */}
          {successMessage && (
            <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2">
              <i className="fas fa-check-circle"></i>
              <span>Form submitted successfully!</span>
            </div>
          )}
        </div>

        {/* Map section on the right */}
        <div className="flex-1 mt-6 md:mt-[60px] relative z-0 after:hidden md:after:block after:content-[''] after:absolute md:after:top-[-40px] md:after:left-[250px] md:after:right-[-60px] md:after:bottom-[260px] after:bg-[#90b300] after:-z-10">
          <img
            src={data.map.src}
            alt={data.map.alt}
            className={data.map.class}
          />
        </div>
      </div>
    </div>
    </>
  );
}
