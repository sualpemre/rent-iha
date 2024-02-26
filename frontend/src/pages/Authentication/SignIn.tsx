import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Tb3 from '../../images/tb3.png';
import BaykarLogo from '../../images/baykar.png';
import IconEmail from '../../images/icon/icon-email.svg';
import IconPassword from '../../images/icon/icon-password.svg';
import { LoginType, UserRole } from '../../@types/identity';
import { toast } from 'react-toastify';
import Alert from '../../components/UiElements/Alert';
import { AuthContext } from '../../contexts/AuthContext';
const SignIn: React.FC = () => {
  const [formData, setFormData] = useState<LoginType | null>(null);
  const [alert, setAlert] = useState<{ [key: string]: string[] } | null>(null)
  const authcontext = useContext(AuthContext)
  let navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name !== undefined && value !== undefined) {
      const newFormData: LoginType = { ...formData, [name as string]: value as string };
      setFormData(newFormData);
    }
  };


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formData != null) {
      const response = await authcontext.signIn(formData);

      if (response != null) {
        if (response.status === 200) {
          toast.success("Giriş İşlemi Başarılı");
          setAlert(null)
          if (response.data.role == UserRole.Admin) {
            return navigate('/admin');
          } else if (response.data.role == UserRole.Default) {
            return navigate('/dashboard');
          }
        }
        else {
          toast.error("Giriş Yapılamadı");
          setAlert(response.data)
        }
      }
      else {
        setAlert({ "error": ["Hata meydana geldi"] })
      }

    }
  };

  return (
    <div className="container m-auto rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
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
              Sign In to Sky
            </h2>
            <Alert alertObject={alert} />
            <form onSubmit={handleSubmit}>
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

              <div className="mb-6">
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

              <div className="mb-5">
                <input
                  type="submit"
                  value="Sign In"
                  className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                />
              </div>

              <div className="mt-6 text-center">
                <p>
                  Don’t have any account?{' '}
                  <Link to="/signup" className="text-primary">
                    Sign Up
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
