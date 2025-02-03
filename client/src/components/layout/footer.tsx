import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-primary">Redrchid</h3>
            <p className="text-muted-foreground">
              Professional accounting services tailored to your business needs.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#services" className="text-muted-foreground hover:text-primary">
                  Services
                </a>
              </li>
              <li>
                <a href="#about" className="text-muted-foreground hover:text-primary">
                  About Us
                </a>
              </li>
              <li>
                <a href="#contact" className="text-muted-foreground hover:text-primary">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3 text-muted-foreground">
                <Phone className="h-5 w-5" />
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3 text-muted-foreground">
                <Mail className="h-5 w-5" />
                <span>contact@redorchid.com</span>
              </li>
              <li className="flex items-center space-x-3 text-muted-foreground">
                <MapPin className="h-5 w-5" />
                <span>123 Business Ave, Suite 100<br />New York, NY 10001</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Business Hours</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>Monday - Friday: 9:00 AM - 6:00 PM</li>
              <li>Saturday: 10:00 AM - 2:00 PM</li>
              <li>Sunday: Closed</li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Redorchid. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
