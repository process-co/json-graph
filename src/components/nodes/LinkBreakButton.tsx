import type { ReactElement } from 'react';
import { LinkBreakIcon, LinkIcon } from '../icons';

export function LinkBreakButton({ isExpanded, onClick }: { isExpanded: boolean, onClick: (e: React.MouseEvent<HTMLButtonElement>) => void }): ReactElement {
    return (
        <button
            type="button"
            onClick={onClick}
            className="pui:bg-gray-900 pui:text-white pui:border-node-border pui:border-bg-gray-400 pui:hover:border-node-border-hover pui:rounded-sm pui:size-6 pui:flex pui:items-center pui:justify-center pui:cursor-pointer pui:flex-shrink-0"
            aria-label={isExpanded ? 'Collapse' : 'Expand'}
        >
            <span style={{ width: '14px', height: '14px', display: 'block' }}>
                {isExpanded ? <LinkBreakIcon /> : <LinkIcon />}
            </span>
        </button>
    );
} 