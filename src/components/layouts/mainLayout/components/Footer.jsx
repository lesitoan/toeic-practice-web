import React from 'react';
import Link from 'next/link';
import { ABOUT_US, POLICIES, RESOURCES, WEB_TITLE } from '../constants/constants';
import Image from 'next/image';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { Button } from '@nextui-org/react';

const Footer = () => {
  return (
    <footer className="bg-bgPrimary text-textBlackColor py-12">
      <div className="container mx-auto">
        {/* Social Media Section */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4 text-textPrimary">
            <Button color="primary">👍 Like 47K</Button>
            <Button color="primary">Share</Button>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center mb-6">
              <Image src="/logo/default-logo.png" alt="Logo" width={40} height={40} />
              <h3 className="text-xl font-bold">{WEB_TITLE}</h3>
            </div>

            {/* Social Icons */}
            <div className="flex space-x-4">
              <Link href="#" className="text-black-300 hover:text-blue-600 transition-colors">
                <Facebook size={20} />
              </Link>
              <Link href="#" className="text-black-300 hover:text-blue-600 transition-colors">
                <Instagram size={20} />
              </Link>
              <Link href="#" className="text-black-300 hover:text-blue-600 transition-colors">
                <Twitter size={20} />
              </Link>
              <Link href="#" className="text-black-300 hover:text-blue-600 transition-colors">
                <Youtube size={20} />
              </Link>
              <Link href="#" className="text-black-300 hover:text-blue-600 transition-colors">
                <div className="w-5 h-5 bg-current rounded-full"></div>
              </Link>
            </div>
          </div>

          {/* */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{`Về ${WEB_TITLE}`}</h4>
            <ul className="space-y-2">
              {ABOUT_US.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className="text-black-300 hover:text-blue-600 transition-colors"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tài nguyên */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Tài nguyên</h4>
            <ul className="space-y-2">
              {RESOURCES.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className="text-black-300 hover:text-blue-600 transition-colors"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Chính sách chung */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Chính sách chung</h4>
            <ul className="space-y-2">
              {POLICIES.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className="text-black-300 hover:text-blue-600 transition-colors"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Company Info */}
        <div className="border-t border-gray-700 pt-8">
          <div className="mb-6">
            <h5 className="text-lg font-semibold mb-4">Thông tin doanh nghiệp</h5>
            <div className="text-gray-300 space-y-2">
              <p className="font-semibold">CÔNG TY TNHH 3 THÀNH VIÊN</p>
              <p>Điện thoại liên hệ/Hotline: 12344354545</p>
              <p>Email: demo.team@gmail.com</p>
              <p>Nguyễn Lương Bằng, ĐẠI HỌC BÁCH KHOA ĐÀ NẴNG</p>
              {/* <p>
                Giấy chứng nhận Đăng ký doanh nghiệp số: 0109675459 do Sở Kế hoạch và Đầu tư thành
                phố Hà Nội cấp
              </p>
              <p>Ngày cấp phép: 17/06/2021</p>
              <p className="text-sm">
                CS1: TRUNG TÂM NGOẠI NGỮ STUDY4 - Số 17, Ngõ 208 Giải Phóng, Phường Phương Liệt,
                Quận Thanh Xuân, Thành phố Hà Nội, Việt Nam - Quyết định cho phép Trung tâm ngoại
                ngữ hoạt động số 2654/QĐ-SGDĐT Hà Nội
              </p> */}
            </div>
          </div>

          {/* Copyright and Disclaimers */}
          <div className="text-center text-gray-400 text-sm space-y-2">
            <p>{`${WEB_TITLE} © Bản quyền của TẤN, TOÀN, LƯU`}</p>
            {/* <p>
              IELTS is a registered trademark of University of Cambridge, the British Council, and
              IDP Education Australia. This site and its owners are not affiliated, approved or
              endorsed by the University of Cambridge ESOL, the British Council, and IDP Education
              Australia.
            </p> */}
            <p>
              ETS®, TOEIC® and TOEFL® are registered trademarks of Educational Testing Service
              (ETS). This web site is not endorsed or approved by ETS.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
