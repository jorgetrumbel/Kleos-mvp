import { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';

import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Stepper } from '@/components/ui/Stepper';

import {
  borderRadius,
  colors,
  spacing,
  typography,
} from '@/theme';

const SPORTS = [
  'Trail',
  'Running',
  'Cycling',
  'Swimming',
  'Strength',
  'Yoga',
  'CrossFit',
  'Boxing',
];

export default function RegisterCoachStep2() {
  const router = useRouter();

  const [avatarUri, setAvatarUri] = useState<string | null>(null);

  const [businessName, setBusinessName] = useState('');
  const [bio, setBio] = useState('');
  const [experience, setExperience] = useState('');
  const [city, setCity] = useState('');
  const [instagram, setInstagram] = useState('');

  const [selectedSports, setSelectedSports] = useState<string[]>([]);

  const pickAvatar = async () => {
    const result =
      await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

    if (!result.canceled) {
      setAvatarUri(result.assets[0].uri);
    }
  };

  const toggleSport = (sport: string) => {
    setSelectedSports(previous =>
      previous.includes(sport)
        ? previous.filter(s => s !== sport)
        : [...previous, sport],
    );
  };

  const initials =
    businessName
      .split(' ')
      .map(word => word[0])
      .join('')
      .slice(0, 2) || 'C';

  return (
    <ScrollView
      style={s.root}
      contentContainerStyle={s.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft
            size={20}
            color={colors.primary}
          />
        </TouchableOpacity>

        <Text style={s.stepLabel}>
          Step 2 of 3
        </Text>
      </View>

      <Stepper
        current={2}
        total={3}
      />

      <View style={s.avatarContainer}>
        <Avatar
          size="lg"
          source={
            avatarUri
              ? { uri: avatarUri }
              : undefined
          }
          initials={initials}
          editable
          onPress={pickAvatar}
        />

        <Text style={s.avatarLabel}>
          Add profile picture
        </Text>
      </View>

      <Input
        label="Business Name"
        value={businessName}
        onChangeText={setBusinessName}
        placeholder="My Coaching Club"
      />

      <Input
        label="Presentation"
        value={bio}
        onChangeText={setBio}
        placeholder="Tell your athletes about yourself..."
        multiline
      />

      <Input
        label="Years of Experience"
        value={experience}
        onChangeText={setExperience}
        placeholder="5"
        keyboardType="numeric"
      />

      <Input
        label="City"
        value={city}
        onChangeText={setCity}
        placeholder="Santiago"
      />

      <View>
        <Text style={s.label}>
          Sports
        </Text>

        <View style={s.chipsWrap}>
          {SPORTS.map(sport => (
            <TouchableOpacity
              key={sport}
              onPress={() => toggleSport(sport)}
              activeOpacity={0.8}
            >
              <Badge
                label={sport}
                variant={
                  selectedSports.includes(sport)
                    ? 'primary'
                    : 'neutral'
                }
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <Input
        label="Instagram (optional)"
        value={instagram}
        onChangeText={setInstagram}
        placeholder="@mycoach"
        autoCapitalize="none"
      />

      <Button
        label="Continue →"
        fullWidth
        onPress={() =>
          router.push('/(auth)/register/step-3-coach')
        }
      />
    </ScrollView>
  );
}

const s = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
    padding: spacing[5],
    gap: spacing[4],
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  stepLabel: {
    color: colors.mutedForeground,
    fontSize: typography.fontSize.xs,
    fontFamily: typography.fontFamily.medium,
  },

  avatarContainer: {
    alignItems: 'center',
    gap: spacing[2],
  },

  avatarLabel: {
    color: colors.primary,
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.fontSize.sm,
  },

  label: {
    marginBottom: spacing[2],
    color: colors.foreground,
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.fontSize.xs,
  },

  chipsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[2],
  },
});