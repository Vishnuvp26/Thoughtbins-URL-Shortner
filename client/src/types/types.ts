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

export interface TablePaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    className?: string;
}

export interface Analytics {
    shortCode: string;
    shortUrl: string;
    originalUrl: string;
    clickCount: number;
    countryDistribution: Record<string, number>;
    geoData: Array<{ ip: string; country: string; time: string }>;
}