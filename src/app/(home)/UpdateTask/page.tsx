import Update from '@/components/shadcn/Update';
import { Suspense } from 'react';

function UpdatePage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Update />
        </Suspense>
    );
}

export default UpdatePage;
