import {ReactElement, ReactNode} from 'react';

export interface IComponentWithLayout<P extends ILayoutProps = {children: ReactNode}> {
  layout?: ILayoutComponent<P>;
}

export interface ILayoutComponent<P extends ILayoutProps = {children: ReactNode}> {
  (props: P): ReactElement;
}

export interface ILayoutProps {
  children: ReactNode;
}
