DEBUG = false
LANG = {
  'c' => 'C',
  'js' => 'Javascript',
  'rb' => 'Ruby',
  'exs' => 'Elixir'
}

arr = {}

# Goals: first 100
1.upto(100) { |n| arr[n.to_s] = {} }

# parse files 
Dir.glob('*/*') do |f|
  # filter out extraneous c and ruby files 
  unless f[/\.out/] or f[/hello.c/] or f[/bin/] or f[/Gemfile/] 
    print "#{f}... " if DEBUG
    num, lang = f[/\d+\.\w+/].split('.')
    instructions, file = File.read(f).split('<<<--->>>')
    arr[num]['instructions'] ||= instructions 
    arr[num][lang] = file.strip
    puts "done: #{arr[num][lang].length}" if DEBUG
  end
end

def exercise_template(num, subarr)
  instr = subarr.delete('instructions').split("\n").map { |e|
    e.sub('# ','').sub('// ','')
  }.join("\n>")
  template = ">**Problem #{num}:** #{instr}\n\n"
  subarr.sort_by{|k,v| k }.each do |lang, str|
    template += "*#{LANG[lang]}*\n"
    template += "```#{lang}\n"
    template += str
    template += "\n```\n\n"
  end
  template
end

doc = "#Multilingual Project Euler\n\n"

arr.sort_by{|k,v| k.to_i }.each do |num, subarr|
  doc += exercise_template(num, subarr) unless subarr.empty?
end

File.write('compare.md', doc)