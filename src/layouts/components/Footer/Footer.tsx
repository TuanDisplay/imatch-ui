import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  TelegramIcon,
  TiktokIcon,
} from '~/components/Icons';
import { DInfoFooter } from './data';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer>
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-8 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="flex flex-col">
            <img src="/logo_rm.png" alt="logo_footer" className="h-16 w-fit" />
            <p className="mt-2 ml-14 text-[#17265C]">
              Kết nối ý tưởng, kiến tạo tương lai!
            </p>
            <div className="mt-5 ml-13 flex gap-2 opacity-35">
              <FacebookIcon />
              <InstagramIcon />
              <TiktokIcon />
              <TelegramIcon />
              <LinkedInIcon />
            </div>
          </div>
          <div className="mt-16 grid grid-cols-3 gap-8 xl:col-span-2 xl:mt-0">
            {DInfoFooter.map((data, index) => {
              return (
                <div key={index}>
                  <h3 className="text-sm leading-6 font-semibold text-gray-900">
                    {data.title}
                  </h3>
                  <ul
                    role="list"
                    className="mt-5 space-y-1 text-xs leading-6 font-extralight text-gray-800 hover:text-gray-900"
                  >
                    {data.list.map((item, index) => {
                      return (
                        <li key={index}>
                          {item.link != null ? (
                            <Link to={item.link}>{item.name}</Link>
                          ) : (
                            item.name
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
        <div className="mt-16 border-t border-gray-900/10 pt-8 sm:mt-20 lg:mt-24">
          <p className="text-xs leading-5 text-gray-500">
            © 2025 I-macth. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
