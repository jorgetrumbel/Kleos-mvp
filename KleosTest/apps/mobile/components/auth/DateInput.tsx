import { Input } from '@/components/ui/Input';

type DateInputProps = {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
};

export function DateInput(props: DateInputProps) {
  return (
    <Input
      {...props}
      keyboardType="numbers-and-punctuation"
    />
  );
}
