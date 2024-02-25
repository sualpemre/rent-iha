import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import IconPassword from '../../images/icon/icon-password.svg';
import IconEmail from '../../images/icon/icon-email.svg';
import IconUser from '../../images/icon/icon-user.svg';
import BaykarLogo from '../../images/baykar.png';
import Tb3 from '../../images/tb3.png';
import { RegisterType } from '../../@types/identity';
import { RegisterService } from '../../services/identity';
import Alert from '../../components/UiElements/Alert';
import { toast } from 'react-toastify';
import { AlertType } from '../../@types/alert';



const SignUp: React.FC = () => {

  const [formData, setFormData] = useState<RegisterType | null>(null);
  const [alert, setAlert] = useState<{ [key: string]: string[] } | null>(null)
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name !== undefined && value !== undefined) {
      const newFormData: RegisterType = { ...formData, [name as string]: value as string };
      setFormData(newFormData);
    }
  };

  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); 
    if (formData != null) {
      RegisterService(formData).then(response => {
        if (response != null) {
          if (response.status === 201) {
            toast.success("Kullanıcı Kaydı Başarılı");
            setAlert(null)
          }
          else if (response.status === 400) {
            toast.error("Kullanıcı Kaydı Oluşturulamadı");
            setAlert(response.data)
          } 
        } else {
          setAlert({ "error": ["Hata meydana geldi"] })
        }
      });
    }
  };

  return (
    <>
      <div className="container m-auto  rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-center">
          <div className="hidden w-full xl:block xl:w-1/2">
            <div className="py-17.5 px-26 text-center">
              <Link className="mb-5.5 inline-block" to="/">
                <img className="dark:hidden" src={BaykarLogo} alt="Logo" />
              </Link>
              <p className="2xl:px-20">
                LET YOUR FEET TOUCH THE SKY
              </p>

              <span className="mt-15 inline-block">
                <img className="dark:hidden" src={Tb3} alt="Logo" />
              </span>
            </div>
          </div>

          <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Sign Up to Sky
              </h2>
              <Alert alertObject={alert} />
              <form onSubmit={handleSubmit}>
                <div className="mb-4 grid grid-cols-2 gap-2">
                  <div >
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Enter your name"
                        name="name"
                        onChange={handleInputChange}
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />

                      <span className="absolute right-4 top-4">
                        <img src={IconUser} alt="Icon User" />
                      </span>
                    </div>
                  </div>
                  <div >
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Surname
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Enter your surname"
                        name="surname"
                        onChange={handleInputChange}
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />

                      <span className="absolute right-4 top-4">
                        <img src={IconUser} alt="Icon User" />
                      </span>
                    </div>

                  </div>

                </div>
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      name="email"
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"

                    />

                    <span className="absolute right-4 top-4">
                      <img src={IconEmail} alt="Icon Email" />
                    </span>
                  </div>
                </div>
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      placeholder="Enter your password"
                      name="password"
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />

                    <span className="absolute right-4 top-4">
                      <img src={IconPassword} alt="Icon Password" />
                    </span>
                  </div>
                </div>
                <div className="mb-6">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Re-type Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      placeholder="Re-enter your password"
                      name="re_password"
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />

                    <span className="absolute right-4 top-4">
                      <img src={IconPassword} alt="Icon Password" />
                    </span>
                  </div>
                </div>
                <div className="mb-5">
                  <input
                    type="submit"
                    value="Create account"
                    className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                  />
                </div>
                <div className="mt-6 text-center">
                  <p>
                    Already have an account?{' '}
                    <Link to="/auth/signin" className="text-primary">
                      Sign in
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>

  );
};

export default SignUp;
