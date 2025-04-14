import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <div className="container px-4 py-5">
        <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
          <div className="col-6">
            <img src="https://mpost.io/wp-content/uploads/dapps-1024x512-1.jpg" alt="logo" className="d-block mx-lg-auto img-fluid" height="500" width="500" />
          </div>
          <div className="col-6">
            <h1 className="fw-bold text-body-emphasis lh-1 mb-3 mb-lg-0">Donate Crypto</h1>
            <p className="lead">Descentralized donation platform</p>
            <p className="lead">Sign in with your wallet and create our campaigns</p>
            <p className="lead mb-3">For donations, please use the campaign link</p>
            <div className="d-flex justify-content-start mt-5">
              <button className="btn btn-primary btn-lg px-4 me-2">
                <img src="/metamask.svg" alt="metamask" width="64" height="64" />
                Connect Wallet
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
