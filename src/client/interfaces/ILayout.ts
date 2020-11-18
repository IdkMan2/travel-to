import {ReactElement, ReactNode} from 'react';

export interface IComponentWithLayout<P extends ILayoutProps = {children: ReactElement}> {
  layout?: ILayoutComponent<P>;
}

export interface ILayoutComponent<P extends ILayoutProps = {children: ReactElement}> {
  (props: P): ReactElement;
}

export interface ILayoutProps {
  children: ReactNode;
}
