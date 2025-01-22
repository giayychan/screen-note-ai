set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.insert_list_with_words()
 RETURNS void
 LANGUAGE sql
AS $function$create or replace function insert_list_with_words(
  p_user_id uuid, 
  p_name text, 
  p_words jsonb
) returns void language plpgsql as $$
declare
  new_list_id uuid;
begin
  -- Begin the transaction block (implicitly within PL/pgSQL)
  
  -- Insert the new list and return the new list id
  insert into lists (user_id, name) values (p_user_id, p_name)
  returning id into new_list_id;

  -- Insert the words using the captured new_list_id
  insert into words (list_id, text, definition, example, part_of_speech)
  select new_list_id, 
         word_data->>'text', 
         word_data->>'definition', 
         word_data->>'example', 
         word_data->>'part_of_speech'
  from jsonb_array_elements(p_words) as word_data;
end;
$$;$function$
;


