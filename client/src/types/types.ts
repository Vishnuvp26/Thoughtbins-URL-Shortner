export interface NavbarProps {
    title: string;
    navItems: { label: string; href: string }[];
}

export interface FormData {
    name: string
    email: string
    password: string
    confirmPassword: string
}

export interface ShortenedUrlCardProps {
    shortUrl: string;
    copyStatus: boolean;
    handleCopy: () => void;
}