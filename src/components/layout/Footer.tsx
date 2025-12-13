import Link from "next/link";
import Image from "next/image";
import { FiFacebook, FiInstagram, FiLinkedin, FiMail, FiPhone, FiMapPin } from "react-icons/fi";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <Image
                src="/images/logo.png"
                alt="Green Style"
                width={50}
                height={50}
                className="w-12 h-12 object-contain"
              />
              <span className="font-display font-bold text-xl text-white">
                Green Style
              </span>
            </div>
            <div className="text-sm mb-4">
              <div>GREEN STYLE COMPANY LIMITED</div>
              <div>บริษัท กรีน สไตล์ จำกัด</div>
              <div className="mt-2">
                ผู้เชี่ยวชาญด้านที่ปรึกษาสิ่งแวดล้อม
                และผู้จัดจำหน่ายสินค้าเป็นมิตรกับสิ่งแวดล้อม
              </div>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-primary-400 transition-colors">
                <FiFacebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-primary-400 transition-colors">
                <FiInstagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-primary-400 transition-colors">
                <FiLinkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-display font-semibold text-white mb-4">
              บริการของเรา
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/services/training" className="hover:text-primary-400 transition-colors">
                  หลักสูตรอบรม
                </Link>
              </li>
              <li>
                <Link href="/services/cfo" className="hover:text-primary-400 transition-colors">
                  คาร์บอนฟุตพริ้นท์องค์กร (CFO)
                </Link>
              </li>
              <li>
                <Link href="/services/cfp" className="hover:text-primary-400 transition-colors">
                  คาร์บอนฟุตพริ้นท์ผลิตภัณฑ์ (CFP)
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-primary-400 transition-colors">
                  ดูบริการทั้งหมด
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-semibold text-white mb-4">
              ลิงก์ด่วน
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-primary-400 transition-colors">
                  เกี่ยวกับเรา
                </Link>
              </li>
              <li>
                <Link href="/case-studies" className="hover:text-primary-400 transition-colors">
                  ผลงาน
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary-400 transition-colors">
                  ติดต่อเรา
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-display font-semibold text-white mb-4">
              ติดต่อเรา
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <FiMapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span>
                  60 หมู่บ้านกลางเมืองรามอินทรา-วัชรพล<br />
                  คลองถนน, สายไหม<br />
                  กรุงเทพมหานคร 10220
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <FiPhone className="w-5 h-5 flex-shrink-0" />
                <a href="tel:0895150247" className="hover:text-primary-400 transition-colors">
                  089-515-0247
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <FiMail className="w-5 h-5 flex-shrink-0" />
                <a href="mailto:greenstyle.se@gmail.com" className="hover:text-primary-400 transition-colors">
                  greenstyle.se@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-center">
          <p>
            © {currentYear} Green Style Co., Ltd. (บริษัท กรีน สไตล์ จำกัด) All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
