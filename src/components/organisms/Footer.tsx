import FooterLinks from "../molecules/FooterLinks";
import FooterSocials from "../molecules/FooterSocials";
import Text from "../atoms/Text";

export default function Footer() {
    return (
        <footer className="bg-gray-900 px-6 py-8 mt-10">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Brand / Description */}
                <div>
                    <h2 className="text-white text-xl font-bold">MyApp</h2>
                    <Text muted>© {new Date().getFullYear()} MyApp. All rights reserved.</Text>
                </div>

                {/* Navigation Links */}
                <FooterLinks />

                {/* Socials */}
                <FooterSocials />
            </div>
        </footer>
    );
}