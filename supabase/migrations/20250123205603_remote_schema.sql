alter table "public"."words" enable row level security;

create policy "Can delete a word where the list_id's user_id matches the curre"
on "public"."words"
as permissive
for delete
to public
using ((EXISTS ( SELECT 1
   FROM lists
  WHERE ((lists.id = words.list_id) AND (lists.user_id = auth.uid())))));


create policy "Can insert a new word where the list_id's user_id matches the c"
on "public"."words"
as permissive
for insert
to public
with check ((EXISTS ( SELECT 1
   FROM lists
  WHERE ((lists.id = words.list_id) AND (lists.user_id = auth.uid())))));


create policy "Can select own words where the list_id's user_id matches the cu"
on "public"."words"
as permissive
for select
to public
using ((EXISTS ( SELECT 1
   FROM lists
  WHERE ((lists.id = words.list_id) AND (lists.user_id = auth.uid())))));


create policy "Can update a word where the list_id's user_id matches the curre"
on "public"."words"
as permissive
for update
to public
using ((EXISTS ( SELECT 1
   FROM lists
  WHERE ((lists.id = words.list_id) AND (lists.user_id = auth.uid())))))
with check ((EXISTS ( SELECT 1
   FROM lists
  WHERE ((lists.id = words.list_id) AND (lists.user_id = auth.uid())))));



