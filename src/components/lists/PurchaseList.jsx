import React from "react";
import PurchaseLi from "../listElement/PurchaseLi";

export default function PurchaseList({ purchases }) {
    if (!purchases || purchases.length === 0) {
        return <p>No purchases available.</p>;
    }

    const sortedPurchases = [...purchases].sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );

    console.log("Sorted Purchases:", sortedPurchases);

    return (
        <ul>
            {sortedPurchases.map((purchase) => (
                <PurchaseLi key={purchase.id} purchase={purchase} />
            ))}
        </ul>
    );
}