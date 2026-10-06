<script setup lang="ts">
import { BeeAlert, BeeButton, BeeCard, BeeFlex, BeeGrid, BeeTag } from '@thaisrr/beedesign'
import ShowcaseSection from './ShowcaseSection.vue'
import ShowcaseSample from './ShowcaseSample.vue'

defineProps<{
  labels: {
    button: string
    tags: string[]
    cardTitle: string
    cardText: string
    closeLabel: string
    alerts: { success: string; error: string; warning: string; info: string }
  }
}>()

const alertTypes = ['success', 'error', 'warning', 'info'] as const
const elevations = [0, 1, 2, 3] as const
</script>

<template>
  <div class="showcase" data-uses="surface border">
    <ShowcaseSection title="BeeButton" wide>
      <BeeFlex gap="md" justify="flex-start" align="flex-start">
        <ShowcaseSample caption="primary">
          <BeeButton data-uses="primary">{{ labels.button }}</BeeButton>
        </ShowcaseSample>
        <ShowcaseSample caption="primary rounded">
          <BeeButton rounded data-uses="primary">{{ labels.button }}</BeeButton>
        </ShowcaseSample>
        <ShowcaseSample caption="secondary">
          <BeeButton variant="secondary" data-uses="primary">{{ labels.button }}</BeeButton>
        </ShowcaseSample>
        <ShowcaseSample caption="ghost">
          <BeeButton variant="ghost" data-uses="primary">{{ labels.button }}</BeeButton>
        </ShowcaseSample>
        <ShowcaseSample caption="disabled">
          <BeeButton disabled>{{ labels.button }}</BeeButton>
        </ShowcaseSample>
        <ShowcaseSample caption="loading">
          <BeeButton loading data-uses="primary">{{ labels.button }}</BeeButton>
        </ShowcaseSample>
      </BeeFlex>
    </ShowcaseSection>

    <ShowcaseSection title="BeeTag">
      <ShowcaseSample caption="default">
        <BeeFlex gap="sm" justify="flex-start">
          <BeeTag v-for="tag in labels.tags" :key="tag" data-uses="primaryLight border">{{ tag }}</BeeTag>
        </BeeFlex>
      </ShowcaseSample>
      <ShowcaseSample caption="rounded">
        <BeeFlex gap="sm" justify="flex-start">
          <BeeTag v-for="tag in labels.tags" :key="tag" rounded data-uses="primaryLight border">{{ tag }}</BeeTag>
        </BeeFlex>
      </ShowcaseSample>
    </ShowcaseSection>

    <ShowcaseSection title="BeeCard">
      <BeeGrid :columns="2" gap="sm" :responsive="false">
        <BeeCard
            v-for="level in elevations"
            :key="level"
            :elevation="level"
            padding="sm"
            data-uses="surface border"
        >
          <div class="card">
            <strong>{{ labels.cardTitle }}</strong>
            <span class="card__text">{{ labels.cardText }}</span>
            <code class="card__caption">elevation {{ level }}</code>
          </div>
        </BeeCard>
      </BeeGrid>
    </ShowcaseSection>

    <ShowcaseSection title="BeeAlert" wide>
      <BeeGrid :columns="2" gap="sm" :responsive="false">
        <BeeAlert v-for="type in alertTypes" :key="type" :type="type" closable :close-label="labels.closeLabel">
          {{ labels.alerts[type] }}
        </BeeAlert>
      </BeeGrid>
    </ShowcaseSection>
  </div>
</template>

<style scoped>
.showcase {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--bd-space-md);
  align-content: start;
  box-sizing: border-box;
  padding: var(--bd-space-md);
  border: var(--bd-border-width) solid var(--bd-color-border);
  border-radius: var(--bd-radius-md);
  background: var(--bd-color-surface);
}
@container (max-width: 640px) {
  .showcase {
    grid-template-columns: minmax(0, 1fr);
  }
}
.card {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.card__text {
  font-size: var(--bd-font-size-sm);
  color: var(--bd-color-text-muted);
}
.card__caption {
  font-size: 12px;
  color: var(--bd-color-text-muted);
}
</style>