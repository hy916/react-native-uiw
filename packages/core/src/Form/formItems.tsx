import React, { FC, useContext } from 'react';
import { KeyType, FormItemsProps } from './types';
import { isObjectEmpty } from './utils/is';
import { Context } from './hooks/context';
import Radio from '../Radio';
import CheckBox from '../CheckBox';
import Rating from '../Rating';
import Switch from '../Switch';
import SearchBar from '../SearchBar';
import FormDatePicker from './comps/datePicker';
import Stepper from '../Stepper';
import TextArea from '../TextArea';
import Slider from '../Slider';
import Label from './comps/label';
import Tip from './comps/tip';
import FormList from './formList';
import { View, SafeAreaView, StyleSheet, TextInput } from 'react-native';
import styles from './styles';

const FormItems: FC<any> = ({ formDatas = [] }) => {
  const {
    innerMethods: { store = {}, updateStore, validator, innerValidate, watch, customComponentList },
  } = useContext(Context);

  const change = (field: KeyType, value: unknown) => {
    updateStore?.({ store: { ...store, [field]: value } });
    watch[field]?.(value);
  };

  const _renderComponent = (v: FormItemsProps) => {
    const options = v.options || [];
    if (v.type === 'input') {
      return (
        <TextInput
          value={store[v.field]}
          onChangeText={(value) => {
            change(v.field, value);
            innerValidate();
          }}
          {...v.attr}
        />
      );
    }
    if (v.type === 'textArea') {
      return (
        <TextArea
          onChange={(value: string) => {
            change(v.field, value);
            innerValidate();
          }}
          value={store[v.field]}
          {...v.attr}
        />
      );
    }
    if (v.type === 'radio') {
      return options.map((item, idx) => (
        <Radio
          key={idx}
          checked={item.value === store[v.field]}
          onPress={() => {
            change(v.field, item.value);
            innerValidate();
          }}
          {...v.attr}
        >
          {item.label}
        </Radio>
      ));
    }
    if (v.type === 'checkBox') {
      return options.map((item, idx) => {
        const values = store[v.field] || [];
        return (
          <CheckBox
            key={idx}
            checked={values.includes(item.value)}
            onChange={() => {
              let data = store[v.field] || [];
              if (!data.includes(item.value)) {
                data.push(item.value);
              } else {
                const idx = data.findIndex((v: KeyType) => v === item.value);
                data.splice(idx, 1);
              }
              change(v.field, data);
              innerValidate();
            }}
            {...v.attr}
          >
            {item.label}
          </CheckBox>
        );
      });
    }
    if (v.type === 'rate') {
      return (
        <Rating
          onPress={(number) => {
            change(v.field, number);
            innerValidate();
          }}
          {...v.attr}
        />
      );
    }
    if (v.type === 'switch') {
      return (
        <Switch
          checked={store[v.field]}
          onValueChange={(value) => {
            change(v.field, !store[v.field]);
            innerValidate();
          }}
          {...v.attr}
        />
      );
    }
    if (v.type === 'search') {
      return (
        <SearchBar
          options={options}
          onChange={(value) => {
            change(v.field, value);
            innerValidate();
          }}
          contentStyle={{ paddingHorizontal: 0 }}
          {...v.attr}
        />
      );
    }
    if (v.type === 'datePicker') {
      return <FormDatePicker value={store[v.field]} ok={(value) => change(v.field, value)} {...v.attr} />;
    }
    if (v.type === 'stepper') {
      return (
        <Stepper
          value={store[v.field]}
          onChange={(value) => {
            change(v.field, value);
            innerValidate();
          }}
          {...v.attr}
        />
      );
    }
    if (v.type === 'slider') {
      return (
        <Slider
          value={store[v.field]}
          onChange={(value) => {
            change(v.field, value);
            innerValidate();
          }}
          {...v.attr}
        />
      );
    }
    if (v.type === 'cardList') {
      return <FormList formListValue={v} />;
    }
    // 自定义组件
    if (!isObjectEmpty(customComponentList) && Object.keys(customComponentList).includes(v.type)) {
      return React.isValidElement(customComponentList[v.type])
        ? React.cloneElement(customComponentList[v.type], {
            ...v.attr,
            value: store[v.field],
            onChange: (value: unknown) => {
              change(v.field, value);
              innerValidate();
            },
          })
        : null;
    }
    return null;
  };

  const _render = () => {
    return formDatas.map((v: FormItemsProps, i: number) => {
      if (v.hide) {
        return null;
      }
      return (
        <View key={i} style={styles.form_items_container}>
          <View style={styles.form_items}>
            <Label v={v} />
            {_renderComponent(v)}
            <Tip v={v} />
          </View>
        </View>
      );
    });
  };

  return <SafeAreaView style={styles.warpper}>{_render()}</SafeAreaView>;
};

export default FormItems;
