<template>
  <div class="md:hidden">
    <VPImage
      alt="Dashboard"
      width="1280"
      height="1214"
      class="block"
      :image="{
        dark: '/examples/dashboard-dark.png',
        light: '/examples/dashboard-light.png',
      }"
    />
  </div>

  <div class="hidden flex-col md:flex">
    <div class="flex-1 space-y-4 p-8 pt-6">
      <div class="flex items-center space-y-2">
        <Button>Скачать отчет</Button>
      </div>
      <div class="space-y-4">
        <div class="space-y-4">
          <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card class="col-span-4">
              <CardHeader>
                <CardTitle>Технические неполадки</CardTitle>
              </CardHeader>
              <CardContent class="-6 w-full h-full text-m">
                {{ malfunction }}
              </CardContent>
            </Card>
            <Card class="col-span-3">
              <CardHeader>
                <CardTitle>Комментарии</CardTitle>
              </CardHeader>
              <CardContent class="flex flex-col gap-2">
                <span class="text-m">Максимальная длина сообщения: {{ maxMessageLength }}</span>
                <span class="text-m">Минимальная длина сообщения: {{ minMessageLength }}</span>
                <span class="text-m">Средняя длина сообщения: {{ avgMessageLength }}</span>
                <span class="text-m">Всего сообщений: {{ totalMessages }}</span>
              </CardContent>
            </Card>
          </div>
          <div class="flex flex-row gap-4 w-ful">
            <Card class="col-span-3 w-ful">
              <CardHeader>
                <CardTitle> Чувствительная информация (материалы)</CardTitle>
              </CardHeader>
              <CardContent class="flex flex-col gap-2 w-ful">
                <span class="text-m">Упоминания конфидициальной информации: {{ emails }} </span>
                <span class="text-m">Использование ненормативной лексики: {{ badWords }}</span>
                <span class="text-m">Кол-во ссылок на запрещенные ресурсы {{ links }}</span>
              </CardContent>
            </Card>
            <Card class="col-span-3">
              <CardHeader>
                <CardTitle> Чувствительная информация (обзор)</CardTitle>
              </CardHeader>
              <CardContent class="flex flex-col gap-2">
                <span class="text-m"
                  >Упоминания конфидициальной информации: {{ emailsNumber }}
                </span>
                <span class="text-m"
                  >Использование ненормативной лексики: {{ badWordsNumber }}</span
                >
                <span class="text-m">Кол-во ссылок на запрещенные ресурсы {{ linksNumber }}</span>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Button } from '@/shared/ui/button';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { useGraphsStore } from '@/store/graphs';
import { useLessonsStore } from '@/store/lessons';
import { computed, onMounted, ref, watch } from 'vue';

const lessonsStore = useLessonsStore();
const graphsStore = useGraphsStore();

const currentGraphs = computed(() => graphsStore.currentGraphs);

const selectedLessonId = computed(() => lessonsStore.selectedLessonId);

const malfunction = ref('' as string | undefined);

const maxMessageLength = ref(0);
const minMessageLength = ref(0);
const avgMessageLength = ref(0);
const totalMessages = ref(0);

const emails = ref([''] as string[] | undefined);
const emailsNumber = ref(0);
const links = ref([''] as string[] | undefined);
const linksNumber = ref(0);
const badWords = ref([''] as string[] | undefined);
const badWordsNumber = ref(0);

onMounted(() => {
  setValues();
});

watch(
  () => currentGraphs.value,
  (newGraphs) => {
    if (newGraphs) {
      setValues();
    }
  }
);

const setValues = () => {
  if (graphsStore.currentGraphs) {
    malfunction.value = graphsStore.currentGraphs.smth_wrong;

    maxMessageLength.value =
      graphsStore.currentGraphs.msg_length[selectedLessonId.value].max_length;
    minMessageLength.value =
      graphsStore.currentGraphs.msg_length[selectedLessonId.value].min_length;
    avgMessageLength.value =
      graphsStore.currentGraphs.msg_length[selectedLessonId.value].average_length;
    totalMessages.value =
      graphsStore.currentGraphs.msg_length[selectedLessonId.value].total_messages;

    emails.value = graphsStore.currentGraphs.msg_bad_words?.emails || ['Пусто'];
    emailsNumber.value = graphsStore.currentGraphs.msg_bad_words?.emails_number || 0;
    badWords.value = graphsStore.currentGraphs.msg_bad_words?.bad_words || ['Пусто'];
    badWordsNumber.value = graphsStore.currentGraphs.msg_bad_words?.bad_words_number || 0;
    links.value = graphsStore.currentGraphs.msg_bad_words?.links || ['Пусто'];
    linksNumber.value = graphsStore.currentGraphs.msg_bad_words?.links_number || 0;
  }
};
</script>

<style scoped></style>
