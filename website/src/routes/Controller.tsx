import { Key, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Loader } from 'uiw';
import { routeData } from '../routes/router';
import NotFound from '../component/NotFound';

const Loading = (
  <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
    <Loader color="#333" tip="页面加载中..." />
  </div>
);

export default function Controller() {
  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="/home" />} />
      <Route path="/docs" element={<Navigate replace to="/docs/getting-started" />} />
      <Route path="/components" element={<Navigate replace to="/components/about" />} />
      {routeData.map(({ component: BasicLayout, path, children = [] }: any, idx) => (
        <Route
          path={path}
          key={idx}
          element={
            <Suspense fallback={Loading}>
              <BasicLayout />
            </Suspense>
          }
        >
          {children.map((child: { component: any; path: string }, idx: Key | null | undefined) => {
            const Child = child.component as any;
            return (
              <Route
                key={idx}
                path={child.path}
                element={
                  <Suspense fallback={Loading}>
                    <Child />
                  </Suspense>
                }
              />
            );
          })}
          <Route path="*" element={<NotFound />} />
        </Route>
      ))}
    </Routes>
  );
}
