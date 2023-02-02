import { Logo } from "@webshop/ui";

const Footer = () => {
  return <footer>
    <div className="flex justify-center gap-36">
      <div>
        <h2 className="mb-6 font-semibold text-base-50 uppercase">Shortcuts</h2>
        <ul className="text-base-600">
          <li className="mb-2">
            <a href="" className="hover:underline">Home</a>
          </li>
          <li className="mb-2">
            <a href="" className="hover:underline">All products</a>
          </li>
          <li>
            <a href="" className="hover:underline">More stuff</a>
          </li>
        </ul>
      </div>
      <div>
        <h2 className="mb-6 font-semibold text-base-50 uppercase">Opening times</h2>
        <ul className="text-base-600">
          <li className="mb-2">
            <a>Weekdays: 07:00 - 07:05</a>
          </li>
          <li className="mb-2">
            <a>Weekends: 08:00 - 08:01</a>
          </li>
        </ul>
      </div>
      <div>
        <h2 className="mb-6 font-semibold text-base-50 uppercase">Contact info</h2>
        <ul className="text-base-600">
          <li className="mb-2">
            <a href="" className="hover:underline">+47 13371337</a>
          </li>
          <li className="mb-2">
            <a href="mailto:support@cgg.no" className="hover:underline">support@cgg.no</a>
          </li>
        </ul>
      </div>
    </div>
    <div className="inline-flex items-center justify-center w-full">
      <hr className="w-64 h-1 my-8 bg-base-800 border-0"></hr>
      <div className="w-32 absolute px-4 -translate-x-1/2 bg-white left-1/2 bg-base-900">
        <Logo variant="small"></Logo>
      </div>
    </div>
    <p className="text-sm text-base-400 text-center">© 2023 CGG™ Certain Rights Reserved.</p>
  </footer>;
};

export default Footer;
