import {
  BreadcrumbCurrent,
  BreadcrumbLink,
  BreadcrumbNav,
  BreadcrumbSeparator,
} from './Breadcrumb.styled';

export type BreadcrumbItem = {
  label: string;
  to?: string;
};

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  'aria-label'?: string;
}

export default function Breadcrumb({
  items,
  'aria-label': ariaLabel = 'Breadcrumb',
}: BreadcrumbProps) {
  return (
    <BreadcrumbNav aria-label={ariaLabel}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span key={`${item.label}-${index}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            {index > 0 && <BreadcrumbSeparator aria-hidden="true">{'>'}</BreadcrumbSeparator>}
            {isLast || !item.to ? (
              <BreadcrumbCurrent aria-current={isLast ? 'page' : undefined}>
                {item.label}
              </BreadcrumbCurrent>
            ) : (
              <BreadcrumbLink to={item.to}>{item.label}</BreadcrumbLink>
            )}
          </span>
        );
      })}
    </BreadcrumbNav>
  );
}
