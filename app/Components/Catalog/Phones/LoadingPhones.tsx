import ContentLoader from 'react-content-loader';

export default function LoadingCards() {
    return (
        <div className="mx-auto grid max-w-7xl grid-cols-3 gap-5 px-5 py-5 max-md:grid-cols-1">
            {Array(4)
                .fill(0)
                .map((_, i) => (
                    <div
                        className="flex h-130 w-100 rounded-3xl bg-white max-md:h-fit max-md:w-80"
                        key={i}
                    >
                        <ContentLoader
                            speed={2}
                            width={400}
                            height={500}
                            viewBox="0 0 400 500"
                            backgroundColor="#e9e7e7"
                            foregroundColor="#fdf7f7"
                        >
                            <rect
                                x="10"
                                y="10"
                                rx="12"
                                ry="12"
                                width="380"
                                height="270"
                            />
                            <rect
                                x="10"
                                y="300"
                                rx="12"
                                ry="12"
                                width="135"
                                height="30"
                            />
                            <rect
                                x="10"
                                y="340"
                                rx="12"
                                ry="12"
                                width="239"
                                height="34"
                            />
                            <rect
                                x="330"
                                y="435"
                                rx="12"
                                ry="12"
                                width="60"
                                height="60"
                            />
                            <rect
                                x="10"
                                y="435"
                                rx="12"
                                ry="12"
                                width="70"
                                height="18"
                            />
                            <rect
                                x="10"
                                y="465"
                                rx="12"
                                ry="12"
                                width="97"
                                height="26"
                            />
                        </ContentLoader>
                    </div>
                ))}
        </div>
    );
}
