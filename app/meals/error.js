'use client';
// we have to make this client even though we are not using any hooks here because whether the client side or backend side of next js this file will catch an error

export default function Error() { // {error} by default by next js
    return (
        <main className="error">
            <h1>An error occured</h1>
            <p>Failed to fetch meal data. Please try again later.</p>
        </main>
    )
}
