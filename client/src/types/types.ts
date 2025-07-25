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