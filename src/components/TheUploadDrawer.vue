<template>
  <Drawer>
    <DrawerTrigger as-child>
      <slot name="trigger" />
    </DrawerTrigger>
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>Загрузка данных</DrawerTitle>
        <DrawerDescription>Перетащите или выберете файл с данными для обработки</DrawerDescription>
      </DrawerHeader>
      <div class="upload">
        <Input @change="onFileChange($event)" class="upload__input" type="file" />
      </div>
      <DrawerFooter class="flex flex-row w-full items-center justify-center">
        <Button @click="upload()" type="submit" class="w-fit" variant="default">
          <IconUpload class="mr-2" />
          <IconLoader class="animate-spin mr-2" v-if="isFetching" />
          Загрузить
        </Button>
        <DrawerClose>
          <Button variant="outline"> Закрыть </Button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
</template>

<script setup lang="ts">
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/shared/ui/drawer';

import { useToast } from '@/shared/ui/toast/use-toast';

import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';

import IconLoader from '~icons/tabler/loader-2';

import IconUpload from '~icons/radix-icons/upload';
import { useLessonsStore } from '@/store/lessons';
import { computed, ref } from 'vue';

const lessonsStore = useLessonsStore();

const file = ref<File | null>(null);

const { toast } = useToast();

const isFetching = computed(() => lessonsStore.isFetching);

const clearFile = () => {
  file.value = null;
};

const upload = () => {
  if (file.value) {
    lessonsStore.sendFile(file.value);
  }
};

const onFileChange = (e: any) => {
  file.value = e.target.files[0];
};
</script>

<style lang="scss" scoped>
.upload {
  width: 100%;
  padding: 64px;
  &__input {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    height: 100%;
    border: 3px dashed rgb(200, 200, 200);
    border-radius: 10px;
    padding: 64px 32px 64px 32px;
    &:hover {
      background-color: rgb(243, 243, 243);
    }
  }
}
</style>
