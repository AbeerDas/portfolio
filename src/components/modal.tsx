import React, { useState } from "react";

interface ModalProps {
    onClose: () => void;
  }

const Modal: React.FC<ModalProps> = ({ onClose }) => {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');
  
    try {
        const nameElement = document.getElementById('name') as HTMLInputElement | null;
        const emailElement = document.getElementById('email') as HTMLInputElement | null;
        const messageElement = document.getElementById('message') as HTMLTextAreaElement | null;
  
        if (nameElement && emailElement && messageElement) {
          const name = nameElement.value;
          const email = emailElement.value;
          const message = messageElement.value;
  
          const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              access_key: "c62f05c1-d405-42b4-a808-88d8fc2ceb92",
              name: name,
              email: email,
              message: message,
            }),
          });
          const result: { success: boolean } = await response.json() as { success: boolean };
  
          if (result.success) {
            setFormStatus('success');
          } else {
            setFormStatus('error');
          }
        } else {
          // Handle the case where one of the elements is not found
          setFormStatus('error');
        }
      } catch (error) {
        setFormStatus('error');
      }
    };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-black md:w-[40rem] p-8 rounded-lg shadow-lg border-2 border-1e293b">
        <div className="flex items-center">
          <h2 className="text-2xl font-bold mb-4">Send Email</h2>
        </div>

        {formStatus === 'success' ? (
          <div className="justify-end">
          <p className="text-green-500">Form submitted successfully!</p>
          <button type="button" 
          onClick={onClose} 
          className="px-4 py-2 bg-gray-300 
          text-md
          hover:bg-gray-400 
          text-gray-800 mt-4 font-semibold rounded-lg">
            Close
          </button>
          </div>
        ) : formStatus === 'error' ? (
            <div className="justify-end">
          <p className="text-red-500">An error occurred. Please try again later.</p>
          <button type="button" 
          onClick={onClose} 
          className="px-4 py-2 bg-gray-300 
          text-md
          hover:bg-gray-400 
          text-gray-800 mt-4 font-semibold rounded-lg">
            Close
          </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} action="send-contact.php" method="post" id="submit-contact-form">
            <div className="flex flex-col mb-4">
              <label htmlFor="name" className="text-lg font-medium text-gray-400 mb-1">Name</label>
              <input type="text" id="name" name="name" required className="border rounded-lg py-2 px-3 bg-gray-900 text-gray-300 focus:outline-none focus:ring focus:border-blue-500" />
            </div>

            <div className="flex flex-col mb-4">
              <label htmlFor="email" className="text-lg font-medium text-gray-400 mb-1">Your Email</label>
              <input type="email" id="email" name="email" required className="border rounded-lg py-2 px-3 bg-gray-900 text-gray-300 focus:outline-none focus:ring focus:border-blue-500" />
            </div>

            <div className="flex flex-col mb-4">
              <label htmlFor="message" className="text-lg font-medium text-gray-400 mb-1">Message</label>
              <textarea id="message" name="message" required rows={4} className="border rounded-lg py-2 px-3 bg-gray-900 text-gray-300 focus:outline-none focus:ring focus:border-blue-500"></textarea>
            </div>

            <div className="flex items-center justify-end">
              <button type="submit" className="bg-blue-500 
              text-md text-white font-semibold 
              py-2 px-4 rounded-lg hover:bg-blue-600">Submit Form</button>
              <button type="button" 
              onClick={onClose} 
              className="px-4 py-2 bg-gray-300 
              text-md
              hover:bg-gray-400 
              text-gray-800 font-semibold rounded-lg ml-2">
                Close
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Modal;
