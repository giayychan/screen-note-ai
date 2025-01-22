create table "public"."words" (
    "id" uuid not null default gen_random_uuid(),
    "list_id" uuid not null,
    "text" text not null,
    "definition" text not null,
    "example" text,
    "part_of_speech" text,
    "created_at" timestamp with time zone not null default now()
);


CREATE UNIQUE INDEX words_pkey ON public.words USING btree (id);

alter table "public"."words" add constraint "words_pkey" PRIMARY KEY using index "words_pkey";

alter table "public"."words" add constraint "words_list_id_fkey" FOREIGN KEY (list_id) REFERENCES lists(id) ON DELETE CASCADE not valid;

alter table "public"."words" validate constraint "words_list_id_fkey";

grant delete on table "public"."words" to "anon";

grant insert on table "public"."words" to "anon";

grant references on table "public"."words" to "anon";

grant select on table "public"."words" to "anon";

grant trigger on table "public"."words" to "anon";

grant truncate on table "public"."words" to "anon";

grant update on table "public"."words" to "anon";

grant delete on table "public"."words" to "authenticated";

grant insert on table "public"."words" to "authenticated";

grant references on table "public"."words" to "authenticated";

grant select on table "public"."words" to "authenticated";

grant trigger on table "public"."words" to "authenticated";

grant truncate on table "public"."words" to "authenticated";

grant update on table "public"."words" to "authenticated";

grant delete on table "public"."words" to "service_role";

grant insert on table "public"."words" to "service_role";

grant references on table "public"."words" to "service_role";

grant select on table "public"."words" to "service_role";

grant trigger on table "public"."words" to "service_role";

grant truncate on table "public"."words" to "service_role";

grant update on table "public"."words" to "service_role";


