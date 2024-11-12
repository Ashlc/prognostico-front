import Column from '@/components/Column';
import React from 'react';

type Props = {
  header: string;
  children: React.ReactNode;
};

const index = ({ header, children }: Props) => {
  return (
    <Column className="gap-2">
      <p className="font-medium">{header}</p>
      <Column className="grow p-4 rounded-lg border">{children}</Column>
    </Column>
  );
};

export default index;
