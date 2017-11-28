arr = {}

# Goals: first 100
1.upto(100) { |n| arr[n] = {} }

def exercise_template(str)
  """
  **Problem #{num}:** #{instructions}
  """
end

def parse_file(f, num, lang)
  file = File.read(f)
  comment = case lang
  when 'c', 'js'
    '//'
  when 'rb', 'exs'
    '#'
  end

  
end

Dir.glob('*/') do |folder|
  Dir.glob("#{folder}*").reject { |e| 
    # filter out extraneous c and ruby files 
    e[/\.out/] or e[/hello.c/] or e[/bin/] or e[/Gemfile/] 
  }.each do |file|
    num, lang = file[/\/\d+\.w+/].split('.')
    parse_file(file, num, lang)

  end
end