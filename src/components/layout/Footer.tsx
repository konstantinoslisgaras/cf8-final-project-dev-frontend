import { SiGithub, SiLinkedin } from "react-icons/si";

const Footer =() => {
    const currentYear: number = new Date().getFullYear();
    return (
        <>
            <footer className="bg-oly-red-dark text-white fixed bottom-0 w-full shadow-lg">
                <div className="w-full py-2 px-4 flex flex-col items-center text-center space-y-2
                md:flex-row md:justify-between md:text-right">
                    <div className="flex items-center space-x-4">
                        <a
                            className="hover:text-red-300 transition-colors"
                            href="https://github.com/konstantinoslisgaras"
                            target="_blank"
                        >
                            <SiGithub size={20} />
                        </a>
                        <a
                            className="hover:text-red-300 transition-colors"
                            href="https://www.linkedin.com/in/konstantinos-lisgaras/"
                            target="_blank"
                        >
                            <SiLinkedin size={20} />
                        </a>
                    </div>
                    <div className="text-xs leading-tight max-w-lg">
                        <p>@ {currentYear} Educational Project for Coding Factory 8 - AUEB.</p>
                        <p>Project created for academic purposes only. No commercial intention.</p>
                        <p>&copy; Konstantinos Lisgaras. Unauthorized reproduction is strongly discouraged.</p>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer;