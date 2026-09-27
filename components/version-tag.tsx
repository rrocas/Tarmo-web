import { Badge } from '@/components/ui/badge'

export default function VersionTag() {
    return (
        <div className='flex justify-start group-data-[collapsible=icon]:hidden'>
            <Badge variant='outline'>v2.1.0</Badge>
        </div>
    )
}