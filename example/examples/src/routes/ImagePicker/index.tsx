import React from 'react';
import ImagePicker, {File} from '@uiw/react-native-image-picker';
import Layout, {Container} from '../../Layout';
import {ComProps} from '../../routes';

const {Header, Body, Card, Footer} = Layout;

export interface ImagePickerProps extends ComProps {}

export default function MenuDropdownView(props: ImagePickerProps) {
  const {route} = props || {};
  const description = route.params.description;
  const title = route.params.title;
  return (
    <Container>
      <Layout>
        <Header title={title} description={description} />
        <Body>
          <Card title="基础实例">
            <ImagePicker
              upload={async (file: File[]) => {
                let imageList: string[] = [];
                await file.forEach(file => imageList.push(file.uri));
                return imageList;
              }}
              selectionLimit={2}
            />
          </Card>
          <Card title="文件预览">
            <ImagePicker
              value={['https://wx3.sinaimg.cn/mw690/4718260ely1gt2cg7t5udj23dw1wkhdu.jpg', 'https://wx3.sinaimg.cn/mw690/4718260ely1gt2cg7t5udj23dw1wkhdu.jpg']}
              readOnly={true}
            />
          </Card>
          <Card title="自定义图片大小">
            <ImagePicker
              value={['https://wx3.sinaimg.cn/mw690/4718260ely1gt2cg7t5udj23dw1wkhdu.jpg', 'https://wx3.sinaimg.cn/mw690/4718260ely1gt2cg7t5udj23dw1wkhdu.jpg']}
              readOnly={true}
              height={70}
              width={70}
            />
          </Card>
          <Card title="限制上传数量">
            <ImagePicker
              value={['https://wx3.sinaimg.cn/mw690/4718260ely1gt2cg7t5udj23dw1wkhdu.jpg']}
              maxCount={2}
              upload={async (file: File[]) => {
                let imageList: string[] = [];
                await file.forEach(file => imageList.push(file.uri));
                return imageList;
              }}
            />
          </Card>
          <Card title="禁用图片上传">
            <ImagePicker disabled={true} />
          </Card>
          <Card title="上传前置处理">
            <ImagePicker
              upload={async (file: File[]) => {
                let imageList: string[] = [];
                await file.forEach(file => imageList.push(file.uri));
                return imageList;
              }}
              beforeUpload={(file: File[]) => {
                console.log('file', file);
                return true;
              }}
            />
          </Card>
        </Body>
        <Footer />
      </Layout>
    </Container>
  );
}
