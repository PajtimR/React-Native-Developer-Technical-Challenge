import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { AppButton } from '../components/AppButton';
import { colors, radius, spacing, typography } from '../theme';
import { NewTaskInput } from '../types';
import { TaskDraftErrors, validateTaskDraft } from '../utils/tasks';

type TaskFormScreenProps = {
  draft?: Partial<NewTaskInput>;
  onCancel: () => void;
  onCreate: (input: NewTaskInput) => void;
};

export function TaskFormScreen({ draft, onCancel, onCreate }: TaskFormScreenProps) {
  const [title, setTitle] = useState(draft?.title ?? '');
  const [description, setDescription] = useState(draft?.description ?? '');
  const [errors, setErrors] = useState<TaskDraftErrors>({});
  const source = draft?.source ?? 'manual';

  const handleCreate = () => {
    const result = validateTaskDraft({ title, description, source });
    setErrors(result.errors);

    if (!result.value) {
      return;
    }

    onCreate({ ...result.value, source });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 18 : 0}
      style={styles.container}
    >
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.content}>
        <View style={styles.topBar}>
          <AppButton label="Back" onPress={onCancel} small variant="ghost" />
          {source === 'api' ? <Text style={styles.sourceBadge}>API draft</Text> : null}
        </View>

        <Text style={styles.kicker}>New entry</Text>
        <Text style={styles.title}>Add a task</Text>

        <View style={styles.formBlock}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            accessibilityLabel="Task title"
            autoFocus
            maxLength={80}
            onChangeText={(value) => {
              setTitle(value);
              if (errors.title) {
                setErrors((current) => ({ ...current, title: undefined }));
              }
            }}
            placeholder="For example: Confirm delivery window"
            placeholderTextColor={colors.muted}
            style={[styles.input, errors.title && styles.inputError]}
            value={title}
          />
          {errors.title ? <Text style={styles.error}>{errors.title}</Text> : null}

          <Text style={[styles.label, styles.descriptionLabel]}>Description</Text>
          <TextInput
            accessibilityLabel="Task description"
            maxLength={280}
            multiline
            onChangeText={(value) => {
              setDescription(value);
              if (errors.description) {
                setErrors((current) => ({ ...current, description: undefined }));
              }
            }}
            placeholder="Add enough context for your future self."
            placeholderTextColor={colors.muted}
            style={[styles.input, styles.textArea, errors.description && styles.inputError]}
            textAlignVertical="top"
            value={description}
          />
          <View style={styles.metaRow}>
            {errors.description ? <Text style={styles.error}>{errors.description}</Text> : <View />}
            <Text style={styles.counter}>{description.trim().length}/280</Text>
          </View>
        </View>

        <AppButton label="Save task" onPress={handleCreate} fullWidth />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  topBar: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xl,
  },
  sourceBadge: {
    backgroundColor: colors.blueSoft,
    borderRadius: radius.sm,
    color: colors.blue,
    fontFamily: typography.utility,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    textTransform: 'uppercase',
  },
  kicker: {
    color: colors.coral,
    fontFamily: typography.utility,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0,
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
  },
  title: {
    color: colors.ink,
    fontFamily: typography.display,
    fontSize: 34,
    fontWeight: '900',
    letterSpacing: 0,
    lineHeight: 38,
    marginBottom: spacing.xl,
  },
  formBlock: {
    backgroundColor: colors.surface,
    borderColor: colors.line,
    borderRadius: radius.md,
    borderWidth: 1,
    marginBottom: spacing.xl,
    padding: spacing.lg,
  },
  label: {
    color: colors.ink,
    fontFamily: typography.body,
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 0,
    marginBottom: spacing.sm,
  },
  descriptionLabel: {
    marginTop: spacing.lg,
  },
  input: {
    backgroundColor: colors.paper,
    borderColor: colors.line,
    borderRadius: radius.sm,
    borderWidth: 1,
    color: colors.ink,
    fontFamily: typography.body,
    fontSize: 16,
    minHeight: 48,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  textArea: {
    lineHeight: 22,
    minHeight: 132,
  },
  inputError: {
    borderColor: colors.danger,
  },
  error: {
    color: colors.danger,
    flex: 1,
    fontFamily: typography.body,
    fontSize: 13,
    lineHeight: 18,
    marginTop: spacing.sm,
  },
  metaRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  counter: {
    color: colors.muted,
    fontFamily: typography.utility,
    fontSize: 11,
    letterSpacing: 0,
    marginLeft: spacing.md,
    marginTop: spacing.sm,
  },
});
